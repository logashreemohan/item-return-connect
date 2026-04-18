<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Recycle Bin Sorter</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        .error-container {
            text-align: center;
            padding: 60px 20px;
        }
        .error-icon {
            font-size: 5em;
            margin-bottom: 20px;
        }
        .error-title {
            font-size: 2em;
            color: #F44336;
            margin-bottom: 15px;
        }
        .error-message {
            font-size: 1.2em;
            color: #666;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>♻️ Recycle Bin Sorter</h1>
            <p class="subtitle">Oops! Something went wrong</p>
        </header>
        
        <main>
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h2 class="error-title">Error Occurred</h2>
                <p class="error-message">
                    We're sorry, but something went wrong. Please try again.
                </p>
                <a href="index.jsp" class="btn-primary" style="max-width: 300px; margin: 0 auto;">
                    Return to Home
                </a>
            </div>
        </main>
        
        <footer>
            <p>&copy; 2025 Recycle Bin Sorter | Making recycling easier for everyone</p>
        </footer>
    </div>
</body>
</html>
