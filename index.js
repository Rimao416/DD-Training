const http = require("http");
const url = require("url");

// Import controller
const userController = require("./controllers/userController");

const PORT = 5000;

// Function to parse the body of POST/PUT requests
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
};

// Function to extract user ID from URL
const extractId = (pathname) => {
  const segments = pathname.split("/");
  return segments[2] ? parseInt(segments[2], 10) : null;
};

// Create the HTTP server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;
  const method = req.method;

  // CORS and JSON headers
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    // User routes
    if (pathname === "/users" && method === "GET") {
      await userController.getAllUsers(req, res, query);
    }
    // - GET /users/:id
    else if (pathname.startsWith("/users/") && method === "GET") {
      const id = extractId(pathname);
      await userController.getUserById(req, res, id);
    }
    // - POST /users
    else if (pathname === "/users" && method === "POST") {
      // POST /users - Créer un nouvel utilisateur
      const body = await parseBody(req);
      await userController.createUser(req, res, body);
    }
    // - PUT /users/:id
    else if (pathname.startsWith("/users/") && method === "PUT") {
      const id = extractId(pathname);
      const body = await parseBody(req);
      await userController.updateUser(req, res, id, body);
    }
    // - DELETE /users/:id
    else if (pathname.startsWith("/users/") && method === "DELETE") {
      const id = extractId(pathname);
      await userController.deleteUser(req, res, id);
    }
    // etc.
    else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  } catch (error) {
    res.writeHead(500);
    res.end(JSON.stringify({ error: error.message }));
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`Endpoints available:`);
  console.log(`   GET    /users             - Get all users`);
  console.log(`   GET    /users/:id         - Get user by ID`);
  console.log(`   POST   /users             - Create user`);
  console.log(`   PUT    /users/:id         - Update user`);
  console.log(`   DELETE /users/:id         - Delete user`);
  console.log(`   BONUS  /users?q=nom       - Search by name`);
  console.log(`   BONUS  /users?limit=5&offset=10 - Pagination`);
});

// Gracefully handle shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down the server...");
  server.close(() => {
    console.log("✅ Server closed cleanly");
    process.exit(0);
  });
});

// Export the server (optional, useful for tests)
module.exports = server;
