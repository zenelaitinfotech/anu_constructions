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
        String dbUrl = rawUrl;

        if (dbUrl != null && !dbUrl.isEmpty()) {
            dbUrl = dbUrl.trim();
            if (dbUrl.startsWith("postgresql://")) {
                dbUrl = "jdbc:" + dbUrl;
            } else if (dbUrl.startsWith("postgres://")) {
                dbUrl = "jdbc:postgresql://" + dbUrl.substring("postgres://".length());
            }
        }

        DataSourceBuilder<?> builder = DataSourceBuilder.create();

        if (dbUrl != null && dbUrl.startsWith("jdbc:postgresql:")) {
            builder.driverClassName("org.postgresql.Driver");

            // Clean up SSL parameters that cause EOFException on Render PostgreSQL
            if (dbUrl.contains("sslmode=require")) {
                dbUrl = dbUrl.replace("sslmode=require", "sslmode=disable");
            }
            if (dbUrl.contains("sslfactory=")) {
                dbUrl = dbUrl.replaceAll("&?sslfactory=[^&]*", "");
            }

            builder.url(dbUrl);
            builder.username(username);
            builder.password(password);
        } else {
            builder.driverClassName("org.h2.Driver");
            builder.url(dbUrl != null && !dbUrl.isEmpty() ? dbUrl : "jdbc:h2:mem:apexdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL");
            builder.username(username);
            builder.password(password);
        }

        return builder.build();
    }
}
