// index.ts

import { createServer } from "node:http";
import express from "express";
import helmet from "helmet";
import { configRouter } from "./routes/config-route.js";
import { apiRoutes } from "./routes/api-routes.js";
import { configApiRouter } from "./routes/config-api-route.js";
import { initializeWebSocket } from "./ws.js";
import { assetsRouter } from "./routes/assets-route.js";
import { homeRouter } from "./routes/home-route.js";
import { createServer as createViteServer } from "vite";
import path from "path";

const startServer = async () => {
  const app = express();
  const port = Number(process.env.PORT) || 3000;
  const httpServer = createServer(app);
  const projectRoot = process.cwd();

  // Initialize WebSocket
  initializeWebSocket(httpServer);

  // Basic security middleware
  app.use(helmet({
    contentSecurityPolicy: false,  // Disable CSP for development
  }));

  // Parse JSON bodies
  app.use(express.json());

  // Regular routes
  app.use("/", homeRouter);
  app.use("/api", apiRoutes);
  app.use("/assets", assetsRouter);
  app.use("/config-api", configApiRouter);

  // Handle config route differently based on environment
  if (process.env.NODE_ENV === "development") {
    // Create Vite dev server for the config page
    const viteDevServer = await createViteServer({
      configFile: path.resolve(projectRoot, "client/config/vite.config.ts"),
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
          port: port
        }
      },
      root: path.resolve(projectRoot, "client/config"),
      base: "/config/"
    });

    // Use Vite middleware for the /config route
    app.use("/config", (req, res, next) => {
      // Remove /config from the url so Vite can handle it properly
      req.url = req.url.replace(/^\/config/, "");
      viteDevServer.middlewares(req, res, next);
    });
  } else {
    // In production, use the static build
    app.use("/config", configRouter);
  }

  httpServer.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

startServer().catch((err) => {
  console.error("Error starting server:", err);
  process.exit(1);
});
