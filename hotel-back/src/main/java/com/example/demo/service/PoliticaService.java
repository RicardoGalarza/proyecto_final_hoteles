package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Politica;
import com.example.demo.repository.PoliticaRepository;

@Service
public class PoliticaService {

    private final PoliticaRepository politicaRepository;

    @Autowired
    public PoliticaService(PoliticaRepository politicaRepository) {
        this.politicaRepository = politicaRepository;
    }

    public List<Politica> obtenerPoliticasPorHabitacion(Long habitacionId) {
        return politicaRepository.findByHabitacionId(habitacionId);
    }
}
