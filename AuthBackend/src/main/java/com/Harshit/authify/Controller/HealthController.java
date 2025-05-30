package com.Harshit.authify.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/check")
    public String healthCheck() {
        return "Backend is up!";
    }
}
