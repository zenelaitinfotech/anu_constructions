package com.apex.construction.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LeadershipMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String role;
    private String initials;

    public LeadershipMember() {}

    public LeadershipMember(String name, String role, String initials) {
        this.name = name;
        this.role = role;
        this.initials = initials;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getInitials() { return initials; }
    public void setInitials(String initials) { this.initials = initials; }
}
