package com.apex.construction.repository;

import com.apex.construction.model.Vlog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VlogRepository extends JpaRepository<Vlog, Long> {}
