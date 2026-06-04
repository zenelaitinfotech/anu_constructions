package com.apex.construction.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.ArrayList;

@Entity
public class EsgPillar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String icon;
    private String color;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> items = new ArrayList<>();

    public EsgPillar() {}

    public EsgPillar(String title, String icon, String color, List<String> items) {
        this.title = title;
        this.icon = icon;
        this.color = color;
        this.items = items;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public List<String> getItems() { return items; }
    public void setItems(List<String> items) { this.items = items; }
}
