package com.apex.construction.repository;

import com.apex.construction.model.AboutFounder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AboutFounderRepository extends JpaRepository<AboutFounder, Long> {
}
