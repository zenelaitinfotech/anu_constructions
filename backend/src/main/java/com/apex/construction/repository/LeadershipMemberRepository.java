package com.apex.construction.repository;

import com.apex.construction.model.LeadershipMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LeadershipMemberRepository extends JpaRepository<LeadershipMember, Long> {
}
