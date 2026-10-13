package com.apex.construction.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String backendUploads = new java.io.File("uploads").getAbsoluteFile().toURI().toString();
        String frontendUploads = new java.io.File("../frontend/public/uploads").getAbsoluteFile().toURI().toString();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(
                    backendUploads,
                    frontendUploads,
                    "file:uploads/",
                    "file:../frontend/public/uploads/"
                );
    }
}
