package com.apex.construction.repository;

import com.apex.construction.model.CompanyValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyValueRepository extends JpaRepository<CompanyValue, Long> {
}
