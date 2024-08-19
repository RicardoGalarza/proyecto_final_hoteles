package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.Cuenta;

public interface CuentaRepository extends JpaRepository<Cuenta, Long> {
  
}
