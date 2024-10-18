package com.example.demo.dto;

import java.util.List;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public class EditarRolDto {
    @NotNull(message = "El nombre no puede ser nulo")
    private String nombre;

    @NotEmpty(message = "Debe proporcionar al menos un ID de permiso")
    private List<Long> permisoIds;

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Long> getPermisoIds() {
        return permisoIds;
    }

    public void setPermisoIds(List<Long> permisoIds) {
        this.permisoIds = permisoIds;
    }
}
