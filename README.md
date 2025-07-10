 💬 MyChat-App with Word Cloud

A real-time chat application built using Node.js, Socket.IO and HTML/CSS/JavaScript. This app dynamically generates a word cloud from the chat messages in real time. The backend is fully Dockerized for simple deployment and scaling.

------

🚀 Features

 💬 Real-time chat using WebSockets (Socket.IO)
 ☁️ Live word cloud generated from user messages
 📆 User join/leave notifications
 📁 Dockerized backend for quick and easy setup
 🎨 Simple, intuitive user interface

------

 🛠️ Technologies Used

 Node.js with Express.js (server)
 Socket.IO (real-time communication)
 HTML5 / CSS3 / JavaScript (frontend)
 WordCloud2.js (client-side word cloud generation)
 Docker (containerization)

---

 ⚖️ Installation

 Option 1: Dockerized Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/MyChat-App.git
cd MyChat-App
```

2. Build and run using Docker:

```bash
docker build -t mychat-app .
docker run -p 3000:3000 mychat-app
```

3. Open your browser:

```
http://localhost:3000
```

 Option 2: Local Setup (Without Docker)

1. Install dependencies:

```bash
npm install
```

2. Run the server:

```bash
node index.js
```

3. Access in browser:

```
http://localhost:3000
```

---

## 🔍 Folder Structure

```
MyChat-App/
├── public/             # Frontend files (HTML, CSS, JS)
│   └── wordcloud2.js   # Word cloud generator
├── index.js            # Node.js + Socket.IO server
├── Dockerfile          # Docker configuration
├── package.json        # Node dependencies
└── README.md           # Project info
```

---

 🛡️ Security Note

This is a demo-level application and should not be used in production without additional security features (rate-limiting, input validation, HTTPS, etc.).

---

 🚀 Future Enhancements

 ✉️ Private messaging
 ⏰ Message timestamp display
 🔧 Admin moderation panel
 ☎️ User authentication

---

 ✨ Live Demo

Try the app here: [https://mychat-app-tpm6.onrender.com](https://mychat-app-tpm6.onrender.com)
I just want to start the service from my end.....

---

 🙌 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

---

