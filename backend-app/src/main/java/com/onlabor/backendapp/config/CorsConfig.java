package com.onlabor.backendapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Manually create and configure CORS settings
        CorsConfiguration corsConfig = new CorsConfiguration();
        corsConfig.addAllowedOrigin("http://localhost:3000"); // Update with your frontend URL
        corsConfig.addAllowedMethod("*"); // Allow all methods (GET, POST, etc.)
        corsConfig.addAllowedHeader("*"); // Allow all headers
        corsConfig.setAllowCredentials(true); // Allow credentials (cookies, authorization header)

        registry.addMapping("/**") // Apply to all endpoints
                .allowedOrigins("http://localhost:3000") // Adjust with your frontend URL
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed methods
                .allowedHeaders("*") // Allow all headers
                .allowCredentials(true); // Allow credentials
    }
}
