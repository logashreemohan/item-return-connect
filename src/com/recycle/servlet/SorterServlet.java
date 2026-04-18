package com.recycle.servlet;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SorterServlet
 * Handles recycling item sorting requests
 */
@WebServlet("/SorterServlet")
public class SorterServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;
    
    /**
     * @see HttpServlet#HttpServlet()
     */
    public SorterServlet() {
        super();
    }
    
    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        // Redirect GET requests to the main page
        response.sendRedirect("index.jsp");
    }
    
    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        // Get the item name from the form
        String itemName = request.getParameter("itemName");
        
        // Create an Item object
        Item item = new Item();
        item.setName(itemName);
        
        // Determine the category
        String category = Item.determineCategory(itemName);
        item.setCategory(category);
        
        // Get recycling tips
        String tips = Item.getRecyclingTips(category);
        item.setDescription(tips);
        
        // Set attributes to pass to the result page
        request.setAttribute("item", item);
        request.setAttribute("category", category);
        request.setAttribute("tips", tips);
        
        // Forward to result page
        request.getRequestDispatcher("result.jsp").forward(request, response);
    }
}
