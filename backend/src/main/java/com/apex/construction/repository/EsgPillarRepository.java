package com.apex.construction.repository;

import com.apex.construction.model.EsgPillar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EsgPillarRepository extends JpaRepository<EsgPillar, Long> {
}
