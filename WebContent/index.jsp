<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recycle Bin Sorter - Learn to Recycle</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>♻️ Recycle Bin Sorter</h1>
            <p class="subtitle">Learn to sort your recyclables correctly!</p>
        </header>
        
        <main>
            <div class="intro-section">
                <h2>How It Works</h2>
                <p>Enter the name of an item you want to recycle, and we'll tell you which bin it belongs to!</p>
            </div>
            
            <div class="form-container">
                <form action="SorterServlet" method="post">
                    <div class="form-group">
                        <label for="itemName">What would you like to recycle?</label>
                        <input 
                            type="text" 
                            id="itemName" 
                            name="itemName" 
                            placeholder="e.g., plastic bottle, aluminum can, newspaper..." 
                            required
                            autofocus
                        >
                    </div>
                    <button type="submit" class="btn-primary">Sort Item</button>
                </form>
            </div>
            
            <div class="categories-grid">
                <h2>Recycling Categories</h2>
                <div class="category-cards">
                    <div class="category-card plastic">
                        <div class="icon">🧴</div>
                        <h3>Plastic</h3>
                        <p>Bottles, containers, bags</p>
                    </div>
                    <div class="category-card metal">
                        <div class="icon">🥫</div>
                        <h3>Metal</h3>
                        <p>Cans, aluminum foil</p>
                    </div>
                    <div class="category-card paper">
                        <div class="icon">📄</div>
                        <h3>Paper</h3>
                        <p>Newspapers, cardboard, magazines</p>
                    </div>
                    <div class="category-card glass">
                        <div class="icon">🍾</div>
                        <h3>Glass</h3>
                        <p>Jars, bottles</p>
                    </div>
                    <div class="category-card organic">
                        <div class="icon">🍎</div>
                        <h3>Organic</h3>
                        <p>Food scraps, yard waste</p>
                    </div>
                    <div class="category-card non-recyclable">
                        <div class="icon">🗑️</div>
                        <h3>Non-Recyclable</h3>
                        <p>General waste</p>
                    </div>
                </div>
            </div>
            
            <div class="info-section">
                <h2>Why Recycle?</h2>
                <div class="benefits">
                    <div class="benefit">
                        <span class="benefit-icon">🌍</span>
                        <p>Protects the environment</p>
                    </div>
                    <div class="benefit">
                        <span class="benefit-icon">💰</span>
                        <p>Saves resources and money</p>
                    </div>
                    <div class="benefit">
                        <span class="benefit-icon">🔄</span>
                        <p>Reduces waste in landfills</p>
                    </div>
                    <div class="benefit">
                        <span class="benefit-icon">⚡</span>
                        <p>Conserves energy</p>
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
