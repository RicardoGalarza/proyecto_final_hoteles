package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Habitacion;

public interface HabitacionRepository extends JpaRepository<Habitacion, Long>{
    
    List<Habitacion> findByCategorias_Id(Long categoriaId);
}
