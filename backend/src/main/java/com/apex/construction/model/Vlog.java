package com.apex.construction.model;

import jakarta.persistence.*;

@Entity
public class Vlog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String videoUrl;      // YouTube URL (any format - auto-converted to embed)
    private String driveUrl;      // Google Drive share URL (auto-converted to /preview embed)
    private String thumbnailUrl;  // Cover image
    private String category;      // e.g. "Construction", "Design", "Tour"
    private String date;          // e.g. "May 30, 2026"

    public Vlog() {}

    public Vlog(String title, String description, String videoUrl, String driveUrl, String thumbnailUrl, String category, String date) {
        this.title = title;
        this.description = description;
        this.videoUrl = videoUrl;
        this.driveUrl = driveUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.category = category;
        this.date = date;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }
    public String getDriveUrl() { return driveUrl; }
    public void setDriveUrl(String driveUrl) { this.driveUrl = driveUrl; }
    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getDate() { return date; }
    public void setDate(String date) { this.date = date; }
}
