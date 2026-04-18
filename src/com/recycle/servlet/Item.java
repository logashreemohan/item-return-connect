package com.recycle.servlet;

/**
 * Item class represents a recyclable item with its category
 */
public class Item {
    private String name;
    private String category;
    private String description;
    
    // Constructor
    public Item(String name, String category, String description) {
        this.name = name;
        this.category = category;
        this.description = description;
    }
    
    // Default constructor
    public Item() {
    }
    
    // Getters and Setters
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    /**
     * Determines the recycling category for a given item name
     * @param itemName the name of the item to categorize
     * @return the category (Plastic, Metal, Paper, Glass, Organic, or Non-Recyclable)
     */
    public static String determineCategory(String itemName) {
        if (itemName == null || itemName.trim().isEmpty()) {
            return "Unknown";
        }
        
        itemName = itemName.toLowerCase().trim();
        
        // Plastic items
        if (itemName.contains("bottle") || itemName.contains("plastic") || 
            itemName.contains("bag") || itemName.contains("container") ||
            itemName.contains("cup") || itemName.contains("straw")) {
            return "Plastic";
        }
        
        // Metal items
        if (itemName.contains("can") || itemName.contains("aluminum") || 
            itemName.contains("tin") || itemName.contains("metal") ||
            itemName.contains("foil")) {
            return "Metal";
        }
        
        // Paper items
        if (itemName.contains("paper") || itemName.contains("cardboard") || 
            itemName.contains("newspaper") || itemName.contains("magazine") ||
            itemName.contains("box") || itemName.contains("envelope")) {
            return "Paper";
        }
        
        // Glass items
        if (itemName.contains("glass") || itemName.contains("jar") || 
            itemName.contains("wine bottle") || itemName.contains("mirror")) {
            return "Glass";
        }
        
        // Organic items
        if (itemName.contains("food") || itemName.contains("banana") || 
            itemName.contains("apple") || itemName.contains("vegetable") ||
            itemName.contains("fruit") || itemName.contains("compost") ||
            itemName.contains("leaves") || itemName.contains("plant")) {
            return "Organic";
        }
        
        // Default to non-recyclable
        return "Non-Recyclable";
    }
    
    /**
     * Get recycling tips for a specific category
     * @param category the recycling category
     * @return helpful tips for that category
     */
    public static String getRecyclingTips(String category) {
        switch (category) {
            case "Plastic":
                return "Rinse containers before recycling. Remove caps and labels when possible.";
            case "Metal":
                return "Rinse cans and crush them to save space. Aluminum can be recycled indefinitely!";
            case "Paper":
                return "Keep paper dry and clean. Remove any plastic windows from envelopes.";
            case "Glass":
                return "Rinse jars and bottles. Remove lids. Glass can be recycled endlessly!";
            case "Organic":
                return "Great for composting! Helps reduce landfill waste and creates nutrient-rich soil.";
            case "Non-Recyclable":
                return "This item cannot be recycled. Please dispose of it in regular trash.";
            default:
                return "Please enter a valid item name.";
        }
    }
}
