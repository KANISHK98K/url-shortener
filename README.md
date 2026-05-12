# 🔗 URL Shortener


A simple URL shortener web app built with **Node.js**, **Express**, **MongoDB**, and vanilla **HTML/CSS/JS**. Deployed on [Render](https://render.com).

---

## 💡 Got the idea from
[roadmap.sh - URL Shortening Service](https://roadmap.sh/projects/url-shortening-service)

___

## 🚀 Live Demo

[https://url-shortener-1-xhlg.onrender.com](https://url-shortener-1-xhlg.onrender.com)

---

## ✨ Features

- Shorten any long URL instantly
- Redirects short URLs to the original destination
- Detects and reuses existing short URLs (no duplicates)
- Clean, minimal frontend UI
- REST API backend

---

## 🛠️ Tech Stack

 Layer      | Technology              
------------|----------------------
 Frontend   | HTML, CSS, JavaScript   
 Backend    | Node.js, Express.js     
 Database   | MongoDB (Atlas)         
 Hosting    | Render                  

---

## 📁 Project Structure

```
url-shortener/
├── public/
│   ├── index.html       # Frontend UI
│   ├── script.js        # Frontend logic
│   └── style.css        # Styles
├── models/
│   └── Url.js           # Mongoose schema
├── server.js            # Express server & API routes
├── .env                 # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/KANISHK98K/url-shortener
cd url-shortener
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/urlshortener?retryWrites=true&w=majority
```

> Get your connection string from [MongoDB Atlas](https://cloud.mongodb.com).

### 4. Start the server

```bash
node server.js
```

The app will be running at **http://localhost:3000**

---

## 🌐 API Reference

### `POST /shorten`

Shortens a given URL.

**Request Body:**
```json
{
  "originalUrl": "https://example.com/some/very/long/url"
}
```

**Response:**
```json
{
  "shortUrl": "https://your-domain.com/abc123"
}
```

---

### `GET /:shortId`

Redirects to the original URL associated with the short ID.

**Example:**
```
GET /abc123  →  302 Redirect to https://example.com/some/very/long/url
```

---

## ☁️ Deploying to Render

1. Push your project to GitHub
2. Go to [Render](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Set the following:
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Add environment variable:
   - `MONGO_URI` → your MongoDB Atlas connection string
6. Click **Deploy**

> ⚠️ Make sure your MongoDB Atlas cluster has **Network Access** set to allow `0.0.0.0/0` so Render can connect.

---

## 🔒 Environment Variables

| Variable    | Description                        |
|-------------|------------------------------------|
| `MONGO_URI` | MongoDB Atlas connection string    |

> Never commit your `.env` file. Add it to `.gitignore`.

---

## 📄 .gitignore

Make sure your `.gitignore` includes:

```
node_modules/
.env
```

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
