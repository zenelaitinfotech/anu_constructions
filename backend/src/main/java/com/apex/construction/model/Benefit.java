package com.apex.construction.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Benefit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String benefitText;

    public Benefit() {}

    public Benefit(String benefitText) {
        this.benefitText = benefitText;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getBenefitText() { return benefitText; }
    public void setBenefitText(String benefitText) { this.benefitText = benefitText; }
}
