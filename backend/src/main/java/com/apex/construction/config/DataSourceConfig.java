package com.apex.construction.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:${DATABASE_URL:jdbc:h2:mem:apexdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL}}")
    private String rawUrl;

    @Value("${spring.datasource.username:sa}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        String dbUrl = rawUrl != null ? rawUrl.trim() : "";

        // Detect PostgreSQL connection
        boolean isPostgres = dbUrl.contains("postgres") || dbUrl.contains("render.com") || dbUrl.contains("5432") || dbUrl.contains("anu_constructions");

        if (isPostgres) {
            if (dbUrl.startsWith("postgresql://")) {
                dbUrl = "jdbc:" + dbUrl;
            } else if (dbUrl.startsWith("postgres://")) {
                dbUrl = "jdbc:postgresql://" + dbUrl.substring("postgres://".length());
            } else if (!dbUrl.startsWith("jdbc:postgresql://")) {
                dbUrl = "jdbc:postgresql://" + dbUrl;
            }

            // Ensure sslmode=require for Render external connection
            if (dbUrl.contains(".render.com") && !dbUrl.contains("sslmode=")) {
                dbUrl += dbUrl.contains("?") ? "&sslmode=require" : "?sslmode=require";
            }

            return DataSourceBuilder.create()
                    .driverClassName("org.postgresql.Driver")
                    .url(dbUrl)
                    .username(username)
                    .password(password)
                    .build();
        } else {
            // Local H2 fallback
            return DataSourceBuilder.create()
                    .driverClassName("org.h2.Driver")
                    .url(dbUrl.isEmpty() ? "jdbc:h2:mem:apexdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL" : dbUrl)
                    .username(username)
                    .password(password)
                    .build();
        }
    }
}
