package com.fueltracker.fuel_management;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/fuel-records")
public class FuelRecordController {

    private final FuelRecordService service;

    public FuelRecordController(FuelRecordService service) {
        this.service = service;
    }

    @GetMapping
    public List<FuelRecord> getAllFuelRecords() {
        return service.getAllFuelRecords();
    }

    @PostMapping
    public FuelRecord addFuelRecord(
            @RequestBody FuelRecord record) {
        return service.saveFuelRecord(record);
    }
}