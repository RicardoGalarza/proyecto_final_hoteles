package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.ReservaService;

@RestController
@RequestMapping("/reserva")
public class ReservaController {

    @Autowired
    private ReservaService reservaService;

    @GetMapping("/fechas-no-disponibles/habitacion/{habitacionId}")
    public List<String> obtenerFechasNoDisponibles(@PathVariable Long habitacionId) {
        return reservaService.obtenerFechasNoDisponibles(habitacionId);
    }
}
