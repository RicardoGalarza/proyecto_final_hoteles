package com.example.demo.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
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

import com.example.demo.dto.EditarHabitacionDto;
import com.example.demo.model.Categoria;
import com.example.demo.model.Ciudad;
import com.example.demo.model.Habitacion;
import com.example.demo.model.Imagen;
import com.example.demo.repository.CiudadRepository;
import com.example.demo.repository.HabitacionRepository;
import com.example.demo.service.CategoriaService;
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
    @Autowired
    private CategoriaService categoriaService;
    @Autowired
    private HabitacionRepository habitacionRepository;
    @Autowired
    private CiudadRepository ciudadRepository;

    @GetMapping
    public List<Habitacion> getAllHabitaciones() {
        return habitacionService.getAllHabitaciones();
    }

    @GetMapping("/{id}")
    public Optional<Habitacion> getHabitacionById(@PathVariable Long id) {
        return habitacionService.getHabitacionById(id);
    }

    @GetMapping("/categoria/{id}")
    public List<Habitacion> getHabitacionByCategoriaId(@PathVariable Long id) {
        return habitacionService.getHabitacionByCategoriaId(id);
    }

    @GetMapping("/ciudad/{idCiudad}")
    public ResponseEntity<List<Habitacion>> getHabitacionesPorCiudad(@PathVariable Long idCiudad) {
        List<Habitacion> habitaciones = habitacionService.findByCiudadId(idCiudad);
        return new ResponseEntity<>(habitaciones, HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Habitacion> createHabitacion(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("categorias") String categorias,
            @RequestParam("imagenes") List<MultipartFile> imagenes,
            @RequestParam("ciudad") Long idCiudad,
            @RequestParam("huespedesAdultos") int huespedesAdultos,
            @RequestParam("huespedesNinos") int huespedesNinos) {

        System.out.println("entro");
        Ciudad ciudad = ciudadRepository.findById(idCiudad)
                .orElseThrow(() -> new IllegalArgumentException("Ciudad no encontrada"));
        // Guardar la habitación y obtener su ID
        Habitacion habitacion = new Habitacion();
        habitacion.setNombre(nombre);
        habitacion.setDescripcion(descripcion);
        habitacion.setPrecio(precio);
        habitacion.setCiudad(ciudad);
        habitacion.setHuespedesAdultos(huespedesAdultos);
        habitacion.setHuespedesNinos(huespedesNinos);

        List<Long> categoriaIds = Arrays.stream(categorias.replace("[", "").replace("]", "").split(","))
                .map(Long::parseLong)
                .collect(Collectors.toList());

        List<Categoria> categoriasObj = categoriaService.getCategoriasByIds(categoriaIds);

        habitacion.setCategorias(categoriasObj);

        Habitacion savedHabitacion = habitacionService.saveHabitacion(habitacion);
        Long habitacionId = savedHabitacion.getId();

        // Crear el directorio basado en el ID de la habitación
        String uploadDirectory = "src/main/resources/static/uploads/" + habitacionId + "/";
        File directory = new File(uploadDirectory);
        if (!directory.exists()) {
            directory.mkdirs(); // Crear la estructura de directorios si no existe
        }

        // Guardar cada imagen en la carpeta correspondiente y actualizar la base de
        // datos
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
                imagenService.saveImagen(nuevaImagen); // Guarda la imagen con ImagenService

                System.out.println("Imagen guardada en: " + filePath.toString());
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(500).build();
            }
        }

        return ResponseEntity.ok(savedHabitacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Habitacion> updateHabitacion(@PathVariable Long id,
            @RequestBody EditarHabitacionDto habitacion) {
        Optional<Habitacion> existingHabitacion = habitacionService.getHabitacionById(id);

        if (existingHabitacion.isPresent()) {
            Habitacion updatedHabitacion = existingHabitacion.get();
            updatedHabitacion.setNombre(habitacion.getNombre());
            updatedHabitacion.setDescripcion(habitacion.getDescripcion());
            updatedHabitacion.setPrecio(habitacion.getPrecio());

            habitacionService.saveHabitacion(updatedHabitacion); // Asegúrate que esta línea guarda los cambios
            return ResponseEntity.ok(updatedHabitacion);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/caracteristicas")
    public ResponseEntity<?> actualizarCaracteristicas(@PathVariable Long id,
            @RequestBody List<String> caracteristicas) {
        Optional<Habitacion> habitacionOpt = habitacionRepository.findById(id);
        if (habitacionOpt.isPresent()) {
            Habitacion habitacion = habitacionOpt.get();
            habitacion.setCaracteristicas(caracteristicas);
            habitacionRepository.save(habitacion);
            return ResponseEntity.ok().body("Características actualizadas correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Habitación no encontrada");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHabitacion(@PathVariable Long id) {
        habitacionService.deleteHabitacion(id);
        return ResponseEntity.ok("Habitación eliminada con éxito");
    }


    @GetMapping("/filtrar")
    public ResponseEntity<List<Habitacion>> filtrarHabitaciones(
            @RequestParam(required = false) Long destino,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaLlegada,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate fechaSalida,
            @RequestParam(required = false) Integer adultos,
            @RequestParam(required = false) Integer ninos) {

        List<Habitacion> habitaciones = habitacionService.filtrarHabitaciones(destino, fechaLlegada, fechaSalida, adultos, ninos);
        return ResponseEntity.ok(habitaciones);
    }
}
