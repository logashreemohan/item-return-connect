import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

/**
 * Standalone Recycle Bin Sorter Web Application
 * Runs without needing Tomcat - uses built-in Java HTTP server
 */
public class RecycleSorter {
    
    private static final int PORT = 8080;
    
    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        
        // Register handlers
        server.createContext("/", new HomeHandler());
        server.createContext("/sort", new SortHandler());
        server.createContext("/styles.css", new CSSHandler());
        
        server.setExecutor(null);
        server.start();
        
        System.out.println("♻️  Recycle Bin Sorter is running!");
        System.out.println("📱 Open your browser at: http://localhost:" + PORT);
        System.out.println("Press Ctrl+C to stop the server");
    }
    
    // Handler for home page
    static class HomeHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response = getHomePage();
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
    
    // Handler for sorting requests
    static class SortHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String response;
            
            if ("POST".equals(exchange.getRequestMethod())) {
                // Read POST data
                InputStreamReader isr = new InputStreamReader(exchange.getRequestBody(), "utf-8");
                BufferedReader br = new BufferedReader(isr);
                String query = br.readLine();
                
                Map<String, String> params = parseQuery(query);
                String itemName = params.getOrDefault("itemName", "Unknown");
                
                // Determine category
                String category = determineCategory(itemName);
                String tips = getRecyclingTips(category);
                
                response = getResultPage(itemName, category, tips);
            } else {
                // Redirect GET to home
                exchange.getResponseHeaders().set("Location", "/");
                exchange.sendResponseHeaders(302, -1);
                return;
            }
            
            exchange.getResponseHeaders().set("Content-Type", "text/html; charset=UTF-8");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
    
    // Handler for CSS
    static class CSSHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            try {
                String css = new String(Files.readAllBytes(Paths.get("WebContent/styles.css")));
                exchange.getResponseHeaders().set("Content-Type", "text/css");
                exchange.sendResponseHeaders(200, css.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(css.getBytes());
                os.close();
            } catch (Exception e) {
                String css = getInlineCSS();
                exchange.getResponseHeaders().set("Content-Type", "text/css");
                exchange.sendResponseHeaders(200, css.getBytes().length);
                OutputStream os = exchange.getResponseBody();
                os.write(css.getBytes());
                os.close();
            }
        }
    }
    
    // Parse URL encoded query string
    private static Map<String, String> parseQuery(String query) {
        Map<String, String> result = new HashMap<>();
        if (query != null) {
            for (String param : query.split("&")) {
                String[] pair = param.split("=");
                if (pair.length > 1) {
                    try {
                        result.put(pair[0], java.net.URLDecoder.decode(pair[1], "UTF-8"));
                    } catch (Exception e) {
                        result.put(pair[0], pair[1]);
                    }
                }
            }
        }
        return result;
    }
    
    // Category determination logic
    private static String determineCategory(String itemName) {
        if (itemName == null || itemName.trim().isEmpty()) {
            return "Unknown";
        }
        
        itemName = itemName.toLowerCase().trim();
        
        if (itemName.contains("bottle") || itemName.contains("plastic") || 
            itemName.contains("bag") || itemName.contains("container") ||
            itemName.contains("cup") || itemName.contains("straw")) {
            return "Plastic";
        }
        
        if (itemName.contains("can") || itemName.contains("aluminum") || 
            itemName.contains("tin") || itemName.contains("metal") ||
            itemName.contains("foil")) {
            return "Metal";
        }
        
        if (itemName.contains("paper") || itemName.contains("cardboard") || 
            itemName.contains("newspaper") || itemName.contains("magazine") ||
            itemName.contains("box") || itemName.contains("envelope")) {
            return "Paper";
        }
        
        if (itemName.contains("glass") || itemName.contains("jar") || 
            itemName.contains("wine bottle") || itemName.contains("mirror")) {
            return "Glass";
        }
        
        if (itemName.contains("food") || itemName.contains("banana") || 
            itemName.contains("apple") || itemName.contains("vegetable") ||
            itemName.contains("fruit") || itemName.contains("compost") ||
            itemName.contains("leaves") || itemName.contains("plant")) {
            return "Organic";
        }
        
        return "Non-Recyclable";
    }
    
    // Get recycling tips
    private static String getRecyclingTips(String category) {
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
    
    private static String getHomePage() {
        return "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "    <title>Recycle Bin Sorter</title>\n" +
            "    <link rel=\"stylesheet\" href=\"/styles.css\">\n" +
            "</head>\n" +
            "<body>\n" +
            "    <div class=\"container\">\n" +
            "        <header>\n" +
            "            <h1>♻️ Recycle Bin Sorter</h1>\n" +
            "            <p class=\"subtitle\">Learn to sort your recyclables correctly!</p>\n" +
            "        </header>\n" +
            "        <main>\n" +
            "            <div class=\"intro-section\">\n" +
            "                <h2>How It Works</h2>\n" +
            "                <p>Enter the name of an item you want to recycle, and we'll tell you which bin it belongs to!</p>\n" +
            "            </div>\n" +
            "            <div class=\"form-container\">\n" +
            "                <form action=\"/sort\" method=\"post\">\n" +
            "                    <div class=\"form-group\">\n" +
            "                        <label for=\"itemName\">What would you like to recycle?</label>\n" +
            "                        <input type=\"text\" id=\"itemName\" name=\"itemName\" " +
            "                               placeholder=\"e.g., plastic bottle, aluminum can, newspaper...\" required autofocus>\n" +
            "                    </div>\n" +
            "                    <button type=\"submit\" class=\"btn-primary\">Sort Item</button>\n" +
            "                </form>\n" +
            "            </div>\n" +
            "            <div class=\"categories-grid\">\n" +
            "                <h2>Recycling Categories</h2>\n" +
            "                <div class=\"category-cards\">\n" +
            "                    <div class=\"category-card plastic\"><div class=\"icon\">🧴</div><h3>Plastic</h3><p>Bottles, containers, bags</p></div>\n" +
            "                    <div class=\"category-card metal\"><div class=\"icon\">🥫</div><h3>Metal</h3><p>Cans, aluminum foil</p></div>\n" +
            "                    <div class=\"category-card paper\"><div class=\"icon\">📄</div><h3>Paper</h3><p>Newspapers, cardboard</p></div>\n" +
            "                    <div class=\"category-card glass\"><div class=\"icon\">🍾</div><h3>Glass</h3><p>Jars, bottles</p></div>\n" +
            "                    <div class=\"category-card organic\"><div class=\"icon\">🍎</div><h3>Organic</h3><p>Food scraps, yard waste</p></div>\n" +
            "                    <div class=\"category-card non-recyclable\"><div class=\"icon\">🗑️</div><h3>Non-Recyclable</h3><p>General waste</p></div>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </main>\n" +
            "        <footer><p>&copy; 2025 Recycle Bin Sorter | Making recycling easier for everyone</p></footer>\n" +
            "    </div>\n" +
            "</body>\n" +
            "</html>";
    }
    
    private static String getResultPage(String itemName, String category, String tips) {
        String emoji = getEmoji(category);
        String colorClass = category.toLowerCase().replace("-", "");
        
        return "<!DOCTYPE html>\n" +
            "<html lang=\"en\">\n" +
            "<head>\n" +
            "    <meta charset=\"UTF-8\">\n" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
            "    <title>Result - Recycle Bin Sorter</title>\n" +
            "    <link rel=\"stylesheet\" href=\"/styles.css\">\n" +
            "</head>\n" +
            "<body>\n" +
            "    <div class=\"container\">\n" +
            "        <header>\n" +
            "            <h1>♻️ Recycle Bin Sorter</h1>\n" +
            "            <p class=\"subtitle\">Sorting Result</p>\n" +
            "        </header>\n" +
            "        <main>\n" +
            "            <div class=\"result-container\">\n" +
            "                <div class=\"result-card " + colorClass + "\">\n" +
            "                    <div class=\"result-icon\">" + emoji + "</div>\n" +
            "                    <h2>Your Item: <span class=\"item-name\">" + itemName + "</span></h2>\n" +
            "                    <div class=\"result-category\">\n" +
            "                        <span class=\"label\">Category:</span>\n" +
            "                        <span class=\"category-badge " + colorClass + "\">" + category + "</span>\n" +
            "                    </div>\n" +
            "                    <div class=\"tips-section\">\n" +
            "                        <h3>♻️ Recycling Tips:</h3>\n" +
            "                        <p class=\"tips\">" + tips + "</p>\n" +
            "                    </div>\n" +
            "                    " + getSuccessMessage(category) + "\n" +
            "                </div>\n" +
            "                <div class=\"action-buttons\">\n" +
            "                    <a href=\"/\" class=\"btn-primary\">Sort Another Item</a>\n" +
            "                </div>\n" +
            "            </div>\n" +
            "        </main>\n" +
            "        <footer><p>&copy; 2025 Recycle Bin Sorter</p></footer>\n" +
            "    </div>\n" +
            "</body>\n" +
            "</html>";
    }
    
    private static String getEmoji(String category) {
        switch (category) {
            case "Plastic": return "🧴";
            case "Metal": return "🥫";
            case "Paper": return "📄";
            case "Glass": return "🍾";
            case "Organic": return "🍎";
            case "Non-Recyclable": return "🗑️";
            default: return "❓";
        }
    }
    
    private static String getSuccessMessage(String category) {
        if (category.equals("Non-Recyclable") || category.equals("Unknown")) {
            return "<div class=\"warning-message\"><p>⚠️ This item should go in regular trash.</p></div>";
        }
        return "<div class=\"success-message\"><p>✅ Great job! This item is recyclable!</p></div>";
    }
    
    private static String getInlineCSS() {
        return "* { margin: 0; padding: 0; box-sizing: border-box; }\n" +
               "body { font-family: 'Segoe UI', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); " +
               "min-height: 100vh; padding: 20px; color: #333; }\n" +
               ".container { max-width: 1200px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; }\n" +
               "header { background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); color: white; text-align: center; padding: 40px 20px; }\n" +
               "header h1 { font-size: 3em; margin-bottom: 10px; }\n" +
               "main { padding: 40px 20px; }\n" +
               ".form-container { max-width: 600px; margin: 0 auto 50px; background: #f8f9fa; padding: 30px; border-radius: 15px; }\n" +
               "input[type='text'] { width: 100%; padding: 15px; font-size: 1em; border: 2px solid #ddd; border-radius: 10px; }\n" +
               ".btn-primary { width: 100%; background: #4CAF50; color: white; padding: 15px; border: none; border-radius: 10px; " +
               "font-size: 1.1em; cursor: pointer; margin-top: 10px; }\n" +
               ".category-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }\n" +
               ".category-card { background: white; padding: 25px; border-radius: 15px; text-align: center; border: 3px solid #e0e0e0; }\n" +
               ".icon { font-size: 3em; }\n" +
               "footer { background: #333; color: white; text-align: center; padding: 20px; }";
    }
}
