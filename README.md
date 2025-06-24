# katyayani-app-links

## Overview

**katyayani-app-links** is a Node.js Express application for generating short URLs (deeplinks) that can redirect users to websites or Android app pages (Google Play Store) based on the provided parameters. It supports deep linking for Android apps using the Digital Asset Links protocol.

---

## Features

- Shorten URLs with custom redirection logic.
- Redirect to a website or Google Play Store based on the destination.
- Store and retrieve URL mappings using MongoDB.
- Serve `.well-known/assetlinks.json` for Android app verification.

---

## Folder Structure

```
katyayani-app-links/
│
├── .env                      # Environment variables
├── .well-known/
│   └── assetlinks.json       # Digital Asset Links for Android
├── index.js                  # Main server file
├── models/
│   └── url.js                # Mongoose schema for URLs
├── package.json              # Project metadata and dependencies
├── README.md                 # Project documentation
└── utils/
    └── extract.js            # Utility for extracting URL parameters
```

---

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd katyayani-app-links
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory with the following content:
   ```
   MONGO_URI=<your_mongodb_connection_uri>
   BASE_URL=http://localhost:3000
   ```

4. **Run the server**
   ```bash
   node index.js
   ```
   The server will start on `http://localhost:3000`.

---

## API Usage

### 1. Create a Short URL

- **Endpoint:** `POST /deeplink`
- **Body:** 
  ```json
  {
    "originalUrl": "https://example.com?fall_back_url=https://fallback.com&destination=play_console&package_name=com.example.app"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "http://localhost:3000/abc123"
  }
  ```

### 2. Redirect Using Short URL

- **Endpoint:** `GET /:shortId`
- **Behavior:** Redirects to the fallback URL or Play Store based on the stored destination.

### 3. Get Original and Fallback URLs

- **Endpoint:** `GET /deeplink/:shortId`
- **Response:**
  ```json
  {
    "originalUrl": "...",
    "fallbackUrl": "..."
  }
  ```

---

## Android App Links

- The `.well-known/assetlinks.json` file is served at `/.well-known/assetlinks.json` for Android app verification.

---

## License

This project is licensed under the