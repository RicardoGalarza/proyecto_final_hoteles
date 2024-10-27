package com.example.demo.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Habitacion;

public interface HabitacionRepository extends JpaRepository<Habitacion, Long>{
    
    List<Habitacion> findByCategorias_Id(Long categoriaId);
    List<Habitacion> findByCiudad_Id(Long idCiudad);

    @Query("SELECT h FROM Habitacion h " +
       "JOIN h.ciudad c " +
       "LEFT JOIN Reserva r ON r.habitacion.id = h.id " +
       "WHERE (:destino IS NULL OR c.id = :destino) " +
       "AND (:adultos IS NULL OR h.huespedesAdultos >= :adultos) " +
       "AND (:ninos IS NULL OR h.huespedesNinos >= :ninos) " +
       "AND (r IS NULL OR " + // Incluir habitaciones sin reservas
       "     (r.fechaReserva NOT BETWEEN :fechaLlegada AND :fechaSalida))")
List<Habitacion> filtrarHabitaciones(@Param("destino") Long destino,
                                     @Param("fechaLlegada") LocalDate fechaLlegada,
                                     @Param("fechaSalida") LocalDate fechaSalida,
                                     @Param("adultos") Integer adultos,
                                     @Param("ninos") Integer ninos);






}
