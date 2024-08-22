package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Cuenta;
import com.example.demo.repository.CuentaRepository;

@Service
public class CuentaService {

    @Autowired
    private CuentaRepository cuentaRepository;

    public List<Cuenta> getAllCuentas() {
        return cuentaRepository.findAll();
    }

    public Optional<Cuenta> getCuentaById(Long id) {
        return cuentaRepository.findById(id);
    }

    public Cuenta saveCuenta(Cuenta cuenta) {
        Optional<Cuenta> existingCuentaByUsuario = cuentaRepository.findByUsuario(cuenta.getUsuario());
        if (existingCuentaByUsuario.isPresent()) {
            throw new RuntimeException("El nombre de usuario ya está en uso.");
        }
        Optional<Cuenta> existingCuentaByCorreo = cuentaRepository.findByCorreo(cuenta.getCorreo());
        if (existingCuentaByCorreo.isPresent()) {
            throw new RuntimeException("El correo electrónico ya está en uso.");
        }
        return cuentaRepository.save(cuenta);
    }

    public void deleteCuenta(Long id) {
        cuentaRepository.deleteById(id);
    }
}
