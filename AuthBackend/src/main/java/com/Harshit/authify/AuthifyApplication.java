package com.Harshit.authify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AuthifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthifyApplication.class, args);
		try {
			SpringApplication.run(AuthifyApplication.class, args);
			System.out.println("✅ Authify is running");
		} catch (Throwable t) {
			System.err.println("❌ Startup failed:");
			t.printStackTrace();
		}
	}

}
