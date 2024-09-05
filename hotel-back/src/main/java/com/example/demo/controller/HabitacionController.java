package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.Habitacion;
import com.example.demo.model.Imagen;
import com.example.demo.service.HabitacionService;
import com.example.demo.service.ImagenService;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;
    @Autowired
    private ImagenService imagenService;

    @GetMapping
    public List<Habitacion> getAllHabitaciones() {
        return habitacionService.getAllHabitaciones();
    }

    @GetMapping("/{id}")
    public Optional<Habitacion> getHabitacionById(@PathVariable Long id) {
        return habitacionService.getHabitacionById(id);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE )
   
    public ResponseEntity<Habitacion> createHabitacion(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            //@RequestParam("imagenes") List<MultipartFile> imagenes) 
            @RequestParam(value = "imagenes") List<MultipartFile> imagenes
            ){

        System.out.println("entro");

        // Guardar la habitación y obtener su ID
        Habitacion habitacion = new Habitacion();
        habitacion.setNombre(nombre);
        habitacion.setDescripcion(descripcion);
        habitacion.setPrecio(precio);

        Habitacion savedHabitacion = habitacionService.saveHabitacion(habitacion);
        Long habitacionId = savedHabitacion.getId();

        // Crear el directorio basado en el ID de la habitación
        String uploadDirectory = "src/main/resources/static/uploads/" + habitacionId + "/";
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs(); // Crear la estructura de directorios si no existe
        }

        // Guardar cada imagen en la carpeta correspondiente y actualizar la base de datos
        for (MultipartFile imagen : imagenes) {
            try {
                // Generar la ruta completa donde se guardará la imagen
                Path filePath = Paths.get(uploadDirectory + imagen.getOriginalFilename().replace(" ", ""));

                // Guardar la imagen en el directorio
                Files.write(filePath, imagen.getBytes());

                // Guardar la imagen en la base de datos con el ID de la habitación
                Imagen nuevaImagen = new Imagen();
                nuevaImagen.setNombre(imagen.getOriginalFilename().replace(" ", ""));
                nuevaImagen.setHabitacion(savedHabitacion);
                imagenService.saveImagen(nuevaImagen);  // Guarda la imagen con ImagenService

                System.out.println("Imagen guardada en: " + filePath.toString());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }

        return ResponseEntity.ok(savedHabitacion);
    }

    @PutMapping("/{id}")
    public Habitacion updateHabitacion(@PathVariable Long id, @RequestBody Habitacion habitacion) {
        Optional<Habitacion> existingHabitacion = habitacionService.getHabitacionById(id);
        if (existingHabitacion.isPresent()) {
            Habitacion updatedHabitacion = existingHabitacion.get();
            updatedHabitacion.setNombre(habitacion.getNombre());
            updatedHabitacion.setDescripcion(habitacion.getDescripcion());
            updatedHabitacion.setPrecio(habitacion.getPrecio());
            updatedHabitacion.setImagenes(habitacion.getImagenes());
            return habitacionService.saveHabitacion(updatedHabitacion);
        } else {
            return null;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabitacion(@PathVariable Long id) {
        habitacionService.deleteHabitacion(id);
        return ResponseEntity.ok("Habitación eliminada con éxito");
    }

}