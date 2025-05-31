package com.Harshit.authify;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class AuthifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthifyApplication.class, args);

	}

	@Bean
	public CommandLineRunner logPort(@Value("${server.port}") String port) {
		return args -> System.out.println("✅ Server is running on port: " + port);
	}

}
