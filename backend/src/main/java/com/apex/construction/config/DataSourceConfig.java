package com.apex.construction.config;

import com.zaxxer.hikari.HikariDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;
import java.sql.Connection;

@Configuration
public class DataSourceConfig {

    private static final Logger log = LoggerFactory.getLogger(DataSourceConfig.class);

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

        boolean isPostgres = dbUrl.contains("postgres") || dbUrl.contains("render.com") || dbUrl.contains("5432") || dbUrl.contains("anu_constructions");

        if (isPostgres) {
            if (dbUrl.startsWith("postgresql://")) {
                dbUrl = "jdbc:" + dbUrl;
            } else if (dbUrl.startsWith("postgres://")) {
                dbUrl = "jdbc:postgresql://" + dbUrl.substring("postgres://".length());
            } else if (!dbUrl.startsWith("jdbc:postgresql://")) {
                dbUrl = "jdbc:postgresql://" + dbUrl;
            }

            // Fix typo between digit 1 and letter l in Render hostname
            if (dbUrl.contains("d9f17hbtqb8s73dbc3f0-a")) {
                dbUrl = dbUrl.replace("d9f17hbtqb8s73dbc3f0-a", "d9fl7hbtqb8s73dbc3f0-a");
            }

            if (dbUrl.contains(".render.com")) {
                if (!dbUrl.contains("ssl=")) {
                    dbUrl += dbUrl.contains("?") ? "&ssl=true" : "?ssl=true";
                }
                if (!dbUrl.contains("sslmode=")) {
                    dbUrl += "&sslmode=require";
                }
            }

            log.info("Attempting to connect to PostgreSQL with URL: {}", dbUrl);
            HikariDataSource pgDataSource = DataSourceBuilder.create()
                    .type(HikariDataSource.class)
                    .driverClassName("org.postgresql.Driver")
                    .url(dbUrl)
                    .username(username)
                    .password(password)
                    .build();
            pgDataSource.setInitializationFailTimeout(3000);

            try (Connection conn = pgDataSource.getConnection()) {
                log.info("Successfully connected to PostgreSQL database!");
                return pgDataSource;
            } catch (Exception e) {
                log.warn("Could not connect to PostgreSQL ({}). Falling back to in-memory H2 database to ensure web service stays live.", e.getMessage());
                try {
                    pgDataSource.close();
                } catch (Exception ignored) {
                }
            }
        }

        // H2 Fallback guarantees web service boots and stays Live on Render
        log.info("Initializing in-memory H2 DataSource fallback.");
        return DataSourceBuilder.create()
                .driverClassName("org.h2.Driver")
                .url("jdbc:h2:mem:apexdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL")
                .username("sa")
                .password("")
                .build();
    }
}
