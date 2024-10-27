package com.example.demo.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Reserva;
import com.example.demo.repository.ReservaRepository;

@Service
public class ReservaService {

    @Autowired
    private ReservaRepository reservaRepository;

    public List<String> obtenerFechasNoDisponibles(Long habitacionId) {
        List<Reserva> reservas = reservaRepository.findByHabitacionId(habitacionId);
        return reservas.stream()
                .map(reserva -> reserva.getFechaReserva().toString())
                .collect(Collectors.toList());
    }
}
