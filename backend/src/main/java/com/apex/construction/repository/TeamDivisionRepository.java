package com.apex.construction.repository;

import com.apex.construction.model.TeamDivision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamDivisionRepository extends JpaRepository<TeamDivision, Long> {
}
