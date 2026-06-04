package com.apex.construction.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class TeamDivision {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(length = 2000)
    private String description;
    
    @ElementCollection
    private List<String> bullets;
    
    private String imageUrl;

    public TeamDivision() {}

    public TeamDivision(String title, String description, List<String> bullets, String imageUrl) {
        this.title = title;
        this.description = description;
        this.bullets = bullets;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public List<String> getBullets() { return bullets; }
    public void setBullets(List<String> bullets) { this.bullets = bullets; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
