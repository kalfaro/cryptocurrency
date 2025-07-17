# Crypto Dashboard

A modern web app built with **Remix**, **React**, **TailwindCSS**, and **DnD Kit** that allows users to view, filter, and reorder a list of cryptocurrencies with real-time exchange rates from the **Coinbase API**.

---

## 🚀 Setup Instructions

### 🐳 Option 1: Docker + Docker Compose (Recommended)

> Requires [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

1. **Clone the repository:**

```bash
git clone git@github.com:kalfaro/cryptocurrency.git
cd cryptocurrency
```

2. **Build and start containers:**

```bash
docker-compose up --build
```

3. **Access the app:**

```bash
http://localhost:5173
```

4. **Access the container shell (if needed):**

```bash
docker compose exec -it cryptocurrency bash
```

---

### 🛠️ Option 2: Local Development

> Requires [Node.js](https://nodejs.org/) >= v18 and [npm](https://www.npmjs.com/)

1. **Clone the repository:**

```bash
git clone git@github.com:kalfaro/cryptocurrency.git
cd cryptocurrency
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the development server:**

```bash
npm run dev
```

> Open in browser: http://localhost:5173

---

## ✅ Testing

This application uses **Vitest** and **Testing Library** for unit and component testing.

### Run tests once

```bash
npm run test
```

### Run tests in watch mode

```bash
npm run test:watch
```

---

## 🧪 Current Test Coverage

- [x] Components: CryptoCard, Footer, Navbar, RefreshButton, SearchInput, SortableCryptoGrid, ThemeToggle
- [x] Custom Hooks (`useDebouncedValue`)
- [x] Services (`getCryptoData`)
- [x] Main Page (`routes/_index.tsx`) – Partially tested via `CryptoDashboard`

---

## 🧪 Features

- Real-time data from Coinbase API.
- Display at least 10 cryptocurrencies with:
  - Name and symbol
  - Exchange rate to USD
  - Exchange rate to BTC
  - Logo
- Filter by name or symbol.
- Drag and drop cards to reorder.
- Persist order in `localStorage`.
- Dark/Light mode toggle.
- Loading and error states.
- Responsive design.

---

## ⚙️ Tech Stack

- [Remix v2](https://remix.run)
- React 18
- TailwindCSS
- DnD Kit
- Coinbase Public API
- Docker & Docker Compose

---

## 📁 Project Structure

```
app/
├── components/
│   ├── CryptoCard/
│       ├── CryptoCard.tsx
│       ├── CryptoCard.test.tsx
│   ├── Footer/
│       ├── Footer.tsx
│       ├── Footer.test.tsx
│   ├── index.ts
│   ├── Navbar/
│       ├── Navbar.tsx
│       ├── Navbar.test.tsx
│   ├── CryptoDashboard/
│       ├── CryptoDashboard.tsx
│       ├── CryptoDashboard.test.tsx
│   ├── RefreshButton/
│       ├── RefreshButton.tsx
│       ├── RefreshButton.test.tsx
│   ├── SearchInput/
│       ├── SearchInput.tsx
│       ├── SearchInput.test.tsx
│   ├── SortableCryptoGrid/
│       ├── SortableCryptoGrid.tsx
│       ├── SortableCryptoGrid.test.tsx
│   └── ThemeToggle/
│       └── ThemeToggle.tsx
│       └── ThemeToggle.test.tsx
├── routes/
│   └── _index.tsx
├── services/
│   └── crypto.service.ts
│   └── crypto.test.ts
├── types/
│   └── crypto.ts
│   └── crypto.test.ts
│   └── index.ts
├── utils/
│   └── useDebouncedValue.ts
│   └── useDebouncedValue.test.ts
```

---

## 📝 Notes on Decisions and Tradeoffs

- Coinbase API lacks logo/image support, so static fallback URLs from CoinGecko were used.
- DnD Kit was selected for its ease of integration with React and drag handle support.
- Dark mode is implemented using Tailwind’s `dark` class strategy.
- Error handling uses `ErrorBoundary` with a normalization helper.
- `localStorage` is used for sorting persistence only on client side.

---

## 📄 License

MIT © 2025 Kenneth Alfaro
