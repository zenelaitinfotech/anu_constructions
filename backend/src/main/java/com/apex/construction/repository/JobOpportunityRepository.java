package com.apex.construction.repository;

import com.apex.construction.model.JobOpportunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobOpportunityRepository extends JpaRepository<JobOpportunity, Long> {
}
