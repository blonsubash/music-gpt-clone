const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "0.0.0.0";
const port = parseInt(process.env.PORT || "3000", 10);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

const activeGenerations = new Map();

/**
 * Get a music thumbnail image identifier
 * Returns an identifier (image1, image2, etc.) that will be mapped to actual URLs on the client
 * Uses the generation ID as a seed for consistency
 */
function getThumbnailImageId(seed) {
  // Available image identifiers that map to actual URLs on the client
  const imageIds = ["image1", "image2", "image3", "image4", "image5", "image6"];

  // Use the seed to pick a consistent image ID for this generation
  const index = seed
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return imageIds[index % imageIds.length];
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
  if (activeGenerations.has(id)) {
    clearInterval(activeGenerations.get(id));
  }

  let progress = 0;
  const totalSteps = 100;
  const updateInterval = 100;
  const totalDuration = 8000;
  const progressIncrement = totalSteps / (totalDuration / updateInterval);

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

      socket.emit("generation-update", {
        id,
        status: "completed",
        progress: 100,

        audioUrl: "/audio/sample.mp3",
        thumbnailUrl: getThumbnailImageId(id),
        completedAt: new Date().toISOString(),
      });

      console.log("Generation completed:", id);
    } else {
      socket.emit("generation-update", {
        id,
        status: "generating",
        progress: Math.floor(progress),
      });
    }
  }, updateInterval);

  activeGenerations.set(id, interval);
}
