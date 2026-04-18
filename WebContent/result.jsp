<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="com.recycle.servlet.Item" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sorting Result - Recycle Bin Sorter</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>♻️ Recycle Bin Sorter</h1>
            <p class="subtitle">Sorting Result</p>
        </header>
        
        <main>
            <%
                Item item = (Item) request.getAttribute("item");
                String category = (String) request.getAttribute("category");
                String tips = (String) request.getAttribute("tips");
                
                // Determine emoji and color based on category
                String emoji = "♻️";
                String colorClass = "";
                
                if (category != null) {
                    switch(category) {
                        case "Plastic":
                            emoji = "🧴";
                            colorClass = "plastic";
                            break;
                        case "Metal":
                            emoji = "🥫";
                            colorClass = "metal";
                            break;
                        case "Paper":
                            emoji = "📄";
                            colorClass = "paper";
                            break;
                        case "Glass":
                            emoji = "🍾";
                            colorClass = "glass";
                            break;
                        case "Organic":
                            emoji = "🍎";
                            colorClass = "organic";
                            break;
                        case "Non-Recyclable":
                            emoji = "🗑️";
                            colorClass = "non-recyclable";
                            break;
                        default:
                            emoji = "❓";
                            colorClass = "unknown";
                    }
                }
            %>
            
            <div class="result-container">
                <div class="result-card <%= colorClass %>">
                    <div class="result-icon"><%= emoji %></div>
                    <h2>Your Item: <span class="item-name"><%= item != null ? item.getName() : "Unknown" %></span></h2>
                    <div class="result-category">
                        <span class="label">Category:</span>
                        <span class="category-badge <%= colorClass %>"><%= category %></span>
                    </div>
                    
                    <div class="tips-section">
                        <h3>♻️ Recycling Tips:</h3>
                        <p class="tips"><%= tips %></p>
                    </div>
                    
                    <% if (!"Non-Recyclable".equals(category) && !"Unknown".equals(category)) { %>
                    <div class="success-message">
                        <p>✅ Great job! This item is recyclable!</p>
                    </div>
                    <% } else if ("Non-Recyclable".equals(category)) { %>
                    <div class="warning-message">
                        <p>⚠️ This item should go in regular trash.</p>
                    </div>
                    <% } %>
                </div>
                
                <div class="action-buttons">
                    <a href="index.jsp" class="btn-primary">Sort Another Item</a>
                </div>
                
                <div class="quick-facts">
                    <h3>Did You Know?</h3>
                    <div class="fact-cards">
                        <% if ("Plastic".equals(category)) { %>
                        <div class="fact-card">
                            <p>🔄 It takes 450 years for a plastic bottle to decompose in a landfill!</p>
                        </div>
                        <% } else if ("Metal".equals(category)) { %>
                        <div class="fact-card">
                            <p>♾️ Aluminum can be recycled infinitely without losing quality!</p>
                        </div>
                        <% } else if ("Paper".equals(category)) { %>
                        <div class="fact-card">
                            <p>🌳 Recycling one ton of paper saves 17 trees!</p>
                        </div>
                        <% } else if ("Glass".equals(category)) { %>
                        <div class="fact-card">
                            <p>✨ Glass can be recycled endlessly without quality loss!</p>
                        </div>
                        <% } else if ("Organic".equals(category)) { %>
                        <div class="fact-card">
                            <p>🌱 Composting organic waste creates nutrient-rich soil for gardens!</p>
                        </div>
                        <% } %>
                        
                        <div class="fact-card">
                            <p>🌍 Recycling reduces greenhouse gas emissions and conserves natural resources!</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        
        <footer>
            <p>&copy; 2025 Recycle Bin Sorter | Making recycling easier for everyone</p>
        </footer>
    </div>
</body>
</html>
