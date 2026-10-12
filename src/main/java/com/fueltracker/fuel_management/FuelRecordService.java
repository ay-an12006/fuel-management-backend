package com.fueltracker.fuel_management;

import java.util.List;

import org.springframework.stereotype.Service;


@Service
public class FuelRecordService {

    private final FuelRecordRepository repository;

    public FuelRecordService(FuelRecordRepository repository) {
        this.repository = repository;
    }

    public List<FuelRecord> getAllFuelRecords() {
        return repository.findAll();
    }

    public FuelRecord saveFuelRecord(FuelRecord record) {
        return repository.save(record);
    }
}