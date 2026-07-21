package com.apex.construction.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:jdbc:h2:mem:apexdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL}")
    private String rawUrl;

    @Value("${spring.datasource.username:sa}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Bean
    @Primary
    public DataSource dataSource() {
        String dbUrl = rawUrl;
        
        // Handle Render's default DATABASE_URL or environment variable missing 'jdbc:' prefix
        if (dbUrl != null) {
            dbUrl = dbUrl.trim();
            if (dbUrl.startsWith("postgresql://")) {
                dbUrl = "jdbc:" + dbUrl;
            } else if (dbUrl.startsWith("postgres://")) {
                dbUrl = "jdbc:postgresql://" + dbUrl.substring("postgres://".length());
            }
        }

        DataSourceBuilder<?> builder = DataSourceBuilder.create()
                .url(dbUrl)
                .username(username)
                .password(password);

        if (dbUrl != null && dbUrl.startsWith("jdbc:postgresql:")) {
            builder.driverClassName("org.postgresql.Driver");
        } else {
            builder.driverClassName("org.h2.Driver");
        }

        return builder.build();
    }
}
