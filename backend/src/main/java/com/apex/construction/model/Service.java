package com.apex.construction.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "services")
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String descText;
    
    private String img;

    public Service() {}

    public Service(String title, String descText, String img) {
        this.title = title;
        this.descText = descText;
        this.img = img;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescText() { return descText; }
    public void setDescText(String descText) { this.descText = descText; }
    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
}
