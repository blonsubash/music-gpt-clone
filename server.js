const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "www.subashbholanlama.com.np";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Store active generations for simulation
const activeGenerations = new Map();

/**
 * Generate a random music image URL using SourceSplash (Unsplash Source replacement)
 * Uses the generation ID as a seed for consistency
 * Format: https://www.sourcesplash.com/i/random?q={query}
 */
function getRandomMusicImageUrl(seed) {
  // Curated list of music-related search queries
  const musicQueries = [
    "music",
    "guitar",
    "piano",
    "vinyl",
    "headphones",
    "microphone",
    "concert",
    "dj",
    "singer",
    "band",
    "music studio",
    "keyboard",
    "drums",
    "violin",
    "saxophone",
  ];

  // Use the seed to pick a consistent query for this generation
  const queryIndex = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const query = musicQueries[queryIndex % musicQueries.length];

  // Use SourceSplash API - replacement for deprecated Unsplash Source
  // Returns random images based on query, works well for 400x400 thumbnails
  return `https://www.sourcesplash.com/i/random?q=${encodeURIComponent(query)}`;
}

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // WebSocket connection handling
  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });

    // Handle generation start
    socket.on("start-generation", (data) => {
      const { id, prompt } = data;
      console.log("Starting generation:", id, prompt);

      // Simulate music generation with progress updates
      simulateGeneration(socket, id, prompt);
    });
  });

  // Make io available globally for API routes
  global.io = io;

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

/**
 * Simulate music generation with progressive status updates
 */
function simulateGeneration(socket, id, prompt) {
  // Clear any existing simulation for this ID
  if (activeGenerations.has(id)) {
    clearInterval(activeGenerations.get(id));
  }

  let progress = 0;
  const totalSteps = 100;
  const updateInterval = 100; // Update every 100ms
  const totalDuration = 8000; // Total generation time: 8 seconds
  const progressIncrement = totalSteps / (totalDuration / updateInterval);

  // Emit initial status
  socket.emit("generation-update", {
    id,
    status: "generating",
    progress: 0,
  });

  const interval = setInterval(() => {
    progress += progressIncrement;

    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      activeGenerations.delete(id);

      // Emit completion
      socket.emit("generation-update", {
        id,
        status: "completed",
        progress: 100,
        audioUrl: `/audio/generated-${id}.mp3`, // Mock URL
        thumbnailUrl: getRandomMusicImageUrl(id), // Random Unsplash music image
        completedAt: new Date().toISOString(),
      });

      console.log("Generation completed:", id);
    } else {
      // Emit progress update
      socket.emit("generation-update", {
        id,
        status: "generating",
        progress: Math.floor(progress),
      });
    }
  }, updateInterval);

  activeGenerations.set(id, interval);
}
