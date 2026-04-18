# 🔎 Campus Item Return & Connect

Hey there! Welcome to the **Campus Item Return & Connect** repository. 

Losing something on campus—whether it's your keys, a student ID, or that incredibly expensive textbook—can be incredibly stressful. On the flip side, finding someone else's belongings and not knowing how to return them is just as frustrating. That's exactly why this project exists. 

This application serves as a centralized, easy-to-use **Lost and Found dashboard** designed specifically for university or college campuses. It bridges the gap between students who have misplaced items and those who have found them, helping reunite people with their belongings quickly and safely.

## ✨ What Does It Do?

We wanted to keep the interface as simple and intuitive as possible. Here are the core features:

- **Secure Authentication**: Users must sign up and log in using their campus email before interacting with the system, adding a layer of trust and accountability. It currently uses local storage so you don't need a live database to try it out!
- **Lost & Found Separation**: The dashboard is neatly divided into "Lost" items (for people looking for their things) and "Found" items (for good Samaritans holding onto something they found).
- **Categorization**: Items are tagged with categories like *Electronics, Books & Stationery, Keys, Bags & Wallets* and more to make searching a breeze. 
- **Detailed Reporting**: When you report an item, you can specify exactly where it was lost/found, what date, what it looks like, and even upload a photo for visual confirmation.
- **Direct Contact Info**: Every post displays the reporter's name and mobile number. No middle-man messaging systems—just direct contact so items can be returned ASAP.
- **Resolution Tracking**: Once an item is safely handed back to its owner, the original poster can mark it as **"Returned"**. This instantly updates the UI, crossing it out and letting everyone else know the case is closed!

## 🚀 How to Run It Locally

We built this heavily around modern frontend tools to ensure it feels snappy. The project uses React, Vite, TypeScript, and the beautiful Shadcn/UI component library.

To get it running on your own machine, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/logashreemohan/item-return-connect.git
   cd item-return-connect
   ```

2. **Install the dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open it up:**
   Visit the local URL provided by Vite (usually `http://localhost:5173` or `8080`) in your web browser. You can register a brand new test account right there and start playing around with the dashboard!

## 🛠️ The Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Radix UI / Shadcn
- **Icons:** Lucide React
- **Data Persistence (Current):** LocalStorage & Web Crypto API for prototyping. 

## 🤝 Want to Contribute?

This project is open-source and we'd love your help making it better for students everywhere! If you have an idea for a feature or you've found a bug, feel free to open an issue or submit a pull request. 

---
*Built with ❤️ for stressed college students everywhere.*
