
# ShlokVaani

ShlokVaani is a modern web application for exploring, reading, and interacting with Hindu scriptures such as the Bhagavad Gita, Ramayana, Vedas, Mahabharat, and Upanishads. The platform allows users to view shlokas, read their meanings, comment, like, bookmark, and even translate Sanskrit shlokas to English using AI-powered APIs.

## Features

- **User Authentication**: Sign up and log in using email/password or Google OAuth (NextAuth.js).
- **Scripture Exploration**: Browse and search shlokas from various Hindu scriptures, organized by book, chapter, and verse.
- **Comments & Likes**: Engage with the community by commenting on and liking shlokas.
- **Bookmarks**: Save your favorite shlokas for quick access.
- **AI Translation**: Translate Sanskrit shlokas to English using HuggingFace and Google Gemini Pro APIs.
- **Responsive UI**: Built with Next.js and Tailwind CSS for a seamless experience across devices.
- **Protected Routes**: Certain pages are accessible only to authenticated users.

## Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Node.js, Next.js API routes, custom server
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: NextAuth.js (Google & Credentials)
- **AI Integration**: HuggingFace API, Google Gemini Pro API

## Project Structure

- `/src/app/` — Main app pages (homepage, dashboard, books, etc.)
- `/src/app/api/` — API endpoints for authentication, data fetching, comments, likes, translation, etc.
- `/src/backend/models/` — Mongoose schemas for User and Shloka
- `/src/components/` — UI components (navbar, footer, shloka card, Google auth, etc.)
- `/public/data/` — Static JS files with book and shloka constants
- `/lib/dbConnect.js` — MongoDB connection utility
- `/server.js` — Custom server entrypoint

## Getting Started

1. **Install dependencies:**
	```bash
	npm install
	```
2. **Set up environment variables:**
	- Create a `.env` file with MongoDB URI, Google OAuth credentials, HuggingFace token, and Gemini API key.
3. **Run the development server:**
	```bash
	npm run dev
	```
	Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The app is ready to deploy on [Vercel](https://vercel.com/) or any platform supporting Next.js.

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
