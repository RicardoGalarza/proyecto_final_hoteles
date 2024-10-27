package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Long> {
    
    List<Reserva> findByHabitacionId(Long habitacionId);
}
