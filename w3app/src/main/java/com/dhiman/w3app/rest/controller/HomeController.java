package com.dhiman.w3app.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/")
public class HomeController {

    @GetMapping("")
    public ResponseEntity<?> home(){
        return ResponseEntity.ok("System Time "+ LocalDateTime.now());
    }
}
