package com.fueltracker.fuel_management;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelRecordRepository
        extends JpaRepository<FuelRecord, Long> {
}