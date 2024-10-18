package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.example.demo.model.Habitacion;
import com.example.demo.repository.HabitacionRepository;

@Service
public class HabitacionService {

    @Autowired
    private HabitacionRepository habitacionRepository;

    public Habitacion crearHabitacion(Habitacion habitacion) {
        try {
            return habitacionRepository.save(habitacion);
        } catch (DataIntegrityViolationException e) {
            throw new IllegalArgumentException("El nombre de la habitación ya existe");
        }
    }

    public List<Habitacion> getAllHabitaciones() {
        return habitacionRepository.findAll();
    }

    public Optional<Habitacion> getHabitacionById(Long id) {
        return habitacionRepository.findById(id);
    }

    public Habitacion saveHabitacion(Habitacion habitacion) {
        return habitacionRepository.save(habitacion);
    }

    public void deleteHabitacion(Long id) {
        habitacionRepository.deleteById(id);
    }

    public List<Habitacion>  getHabitacionByCategoriaId(Long id) {
        return habitacionRepository.findByCategorias_Id(id);
    }
    
}