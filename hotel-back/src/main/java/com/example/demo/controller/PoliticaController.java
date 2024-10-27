package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Politica;
import com.example.demo.service.PoliticaService;

@RestController
@RequestMapping("/habitaciones/{habitacionId}/politicas")
public class PoliticaController {

    private final PoliticaService politicaService;

    @Autowired
    public PoliticaController(PoliticaService politicaService) {
        this.politicaService = politicaService;
    }

    @GetMapping
    public List<Politica> obtenerPoliticasPorHabitacion(@PathVariable Long habitacionId) {
        return politicaService.obtenerPoliticasPorHabitacion(habitacionId);
    }
}
