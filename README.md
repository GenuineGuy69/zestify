# Zestify 🍋

A personalized dietary and nutrition app that helps you cook smarter, eat better, and live zestier!

![Zestify App](client/public/logo.png)

## Features

- **Personalized Onboarding**: Tailors recipes to your diet (Vegan, Keto, etc.), allergies, and health goals.
- **Recipe Discovery**: Browse a curated feed of recipes with detailed nutrition info.
- **AI Chef**: Powered by Google Gemini, generate unique recipes based on your current cravings and ingredients.
- **Step-by-Step Cooking**: Interactive cooking mode with timers and ingredient checklists.
- **Progressive Web App (PWA)**: Install Zestify on your mobile device for a native-like experience.

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL
- **AI**: Google Gemini API
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (optional, for containerized run)
- PostgreSQL (if running locally without Docker)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/GenuineGuy69/zestify.git
    cd zestify
    ```

2.  **Install Dependencies**
    ```bash
    npm run install:all
    ```

3.  **Environment Setup**
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    DATABASE_URL=postgres://user:pass@localhost:5432/nutrient_db
    JWT_SECRET=your_super_secret_key
    GEMINI_API_KEY=your_google_gemini_key
    ```

4.  **Run the App**
    ```bash
    # Run both client and server concurrently
    npm start
    ```

    - Frontend: `http://localhost:5173`
    - Backend: `http://localhost:5000`

### Docker Deployment

```bash
docker-compose up --build
```

## License

MIT
