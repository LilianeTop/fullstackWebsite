package nl.elsenschede.nl.backend.controllers;

import nl.elsenschede.nl.backend.backingbeans.Adaptation;
import nl.elsenschede.nl.backend.backingbeans.Color;
import nl.elsenschede.nl.backend.backingbeans.Theme;

import java.util.ArrayList;
import java.util.List;

public class PhotoFormParameters {
    private Adaptation adaptation;
    private String description;
    private String imagePath;
    private List<Theme> themes = new ArrayList();
    private List<Color> colors = new ArrayList();

    public Adaptation getAdaptation() {
        return adaptation;
    }

    public void setAdaptation(Adaptation adaptation) {
        this.adaptation = adaptation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public List<Theme> getThemes() {
        return themes;
    }

    public void setThemes(List<Theme> themes) {
        this.themes = themes;
    }

    public List<Color> getColors() {
        return colors;
    }

    public void setColors(List<Color> colors) {
        this.colors = colors;
    }
}
