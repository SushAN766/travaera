#  Travaera — Your Smart AI Travel Planner

Welcome to **Travaera**, a modern, AI-powered travel itinerary planner designed to help users generate personalized travel plans with ease. Powered by Gemini and crafted with Vite, React, and TailwindCSS — Travaera offers a seamless, responsive, and interactive user experience.

---

## ✨ Features

-  **AI-Driven Travel Itinerary**: Powered by Gemini, intelligently generates custom travel plans.
-  **Interactive TravelForm**: Gather user inputs like destination, date, and preferences.
-  **Real-Time Itinerary Builder**: Visualize travel days, activities, and stay plans.
-  **Chat Assistant**: Embedded chatbot UI for conversational suggestions.
-  **Settings Dialog**: Customize theme, preferences, and behavior.
-  **Reusable UI Components**: Built using ShadCN-style UI components.
-  **Mobile-First Hooks**: Responsive design with mobile support via `use-mobile`.
-  **Robust TypeScript Setup**: TS config for app, node, and strict typing.

---

##  Project Structure

```text
sushan766-travaera/
├── public/                  # Static assets (optional)
├── src/
│   ├── components/          # Custom and UI components
│   ├── hooks/               # Reusable React hooks
│   ├── lib/                 # Gemini API integration & utilities
│   ├── pages/               # Page-level components (Index, NotFound)
│   ├── App.tsx              # Main app entry
│   └── main.tsx             # Vite bootstrap file
├── Dockerfile               # Docker container setup
├── package.json             # Project dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.ts       # TailwindCSS config
├── tsconfig*.json           # TypeScript configurations
└── README.md                # Project documentation
```

---

##  Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/sushan766/sushan766-travaera.git
cd sushan766-travaera
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the App

```bash
npm run dev
```

Visit `http://localhost:5173` to view the app.

---

##  Docker Support

Build and run the app in a containerized environment:

```bash
# Build Docker image
docker build -t travaera .

# Run container
docker run -p 5173:5173 travaera
```

---

##  Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext .ts,.tsx"
}
```

---

##  Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN UI
- **AI API**: Google Gemini (via `lib/gemini.ts`)
- **State & Hooks**: Zustand (if used), custom hooks
- **Linting**: ESLint

---

##  Key Components

| Component               | Description                              |
|------------------------|------------------------------------------|
| `TravelForm`           | Input form to collect travel details     |
| `TravelItinerary`      | UI to display generated itinerary        |
| `Chat`                 | Gemini-powered assistant chat UI         |
| `SettingsDialog`       | Modal to customize app settings          |
| `lib/gemini.ts`        | Handles Gemini API interaction           |
| `hooks/use-mobile.tsx` | Detects mobile devices for responsive UI |

---

##  AI Integration

This project uses **Gemini API** for generating travel suggestions and itinerary details. The `lib/gemini.ts` file abstracts the API logic. Make sure to set up your API credentials.

---

##  Linting & Formatting

```bash
npm run lint
```

Ensure your code follows project standards using the configured ESLint rules.

---

##  Contributing

Pull requests and issues are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

##  Contact

Created by [Sushanth BS](https://github.com/sushan766) — feel free to reach out for collaboration!


