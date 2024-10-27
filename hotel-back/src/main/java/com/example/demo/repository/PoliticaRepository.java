package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Politica;

@Repository
public interface PoliticaRepository extends JpaRepository<Politica, Long> {
    List<Politica> findByHabitacionId(Long habitacionId);
}