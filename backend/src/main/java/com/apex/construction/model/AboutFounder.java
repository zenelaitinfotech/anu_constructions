package com.apex.construction.model;

import jakarta.persistence.*;

@Entity
public class AboutFounder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String subtitle;

    @Column(length = 5000)
    private String content;

    private String founderName;
    private String founderRole;
    private String imageUrl;

    public AboutFounder() {}

    public AboutFounder(String title, String subtitle, String content, String founderName, String founderRole, String imageUrl) {
        this.title = title;
        this.subtitle = subtitle;
        this.content = content;
        this.founderName = founderName;
        this.founderRole = founderRole;
        this.imageUrl = imageUrl;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getSubtitle() { return subtitle; }
    public void setSubtitle(String subtitle) { this.subtitle = subtitle; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public String getFounderName() { return founderName; }
    public void setFounderName(String founderName) { this.founderName = founderName; }

    public String getFounderRole() { return founderRole; }
    public void setFounderRole(String founderRole) { this.founderRole = founderRole; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
