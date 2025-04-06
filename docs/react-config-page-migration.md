# Plan to Migrate the Config Page to React (TypeScript) with Vite

This plan outlines the steps to transform the existing static config page into a React-based application using Vite and TypeScript. The existing ExpressJS server will continue handling routes, APIs, and websocket state synchronization.

## Overview

- **Repository Integration:**  
  The React config page will be integrated within the current repository. Static assets from `public/config-page` (HTML, CSS, images) will be migrated and refactored into React components written in TypeScript.

- **Tooling & Build Process:**  
  Vite is integrated directly into the Express server in development mode and builds static files for production. The ExpressJS server handles all routing and serves the appropriate content based on the environment.

- **Features:**  
  - Use React and TypeScript for modular, type-safe UI development.
  - Migrate static assets (HTML/CSS/images) from the existing config page into React components.
  - Integrate websocket state (existing implementation in `src/ws.ts`) with React via hooks or context for real-time updates.
  - Retain Express routes and API functionalities, with environment-aware serving of the React app.

## Development Workflow

1. Development Mode:
   - Run `pnpm run dev` to start Express server with integrated Vite dev server
   - Access the config page at http://localhost:3000/config
   - Hot Module Replacement (HMR) works automatically
   - WebSocket connections are proxied to Express

2. Production Mode:
   - Run `pnpm run build` to build both the server and React app
   - Run `pnpm start` to serve the production build
   - Express serves pre-built static files from client/config/dist

## Detailed Steps

### 1. Set Up Vite for React with TypeScript
- **Task:** Configure a Vite project within the current repository with TypeScript support.
- **Subtasks:**
  - Create a new directory (e.g., `/client/config`) for the React config page.
  - Install necessary dependencies: React, ReactDOM, Vite, and TypeScript.
  - Create a `vite.config.ts` file to configure Vite for a React-TypeScript environment.
  - Update `package.json` scripts for Vite development and build commands.

### 2. Migrate Existing Assets to TypeScript React Components
- **Task:** Convert the static HTML and CSS from `public/config-page` into React components using TypeScript.
- **Subtasks:**
  - Create a main component file (e.g., `ConfigPage.tsx`) as the entry point.
  - Rewrite `public/config-page/index.html` as JSX in TypeScript.
  - Refactor CSS from `public/config-page/config-page.css` into a modular format (using CSS Modules or styled-components).
  - Organize and integrate static images/assets within the component's folder structure.
  
### 3. Integrate Websocket State Sync
- **Task:** Incorporate existing websocket functionality into the React application.
- **Subtasks:**
  - Review the current websocket implementation in `src/ws.ts`.
  - Develop a custom React hook or context in TypeScript to manage and expose the websocket state.
  - Connect the websocket state with the config page components to enable real-time updates.

### 4. Update Express Server to Serve the React App
- **Task:** Modify the Express server to integrate Vite in development and serve static files in production.
- **Subtasks:**
  - Integrate Vite dev server middleware in development mode.
  - Configure static file serving for production builds.
  - Ensure correct asset path resolution in both environments.
  - Set up environment-aware routing logic.

### 5. Testing & Iterative Deployment
- **Task:** Create and maintain a markdown document with a detailed TODO list to track progress.
- **Subtasks:**
  - List tasks with subtasks, estimated time, and testing steps.
  - Follow an iterative deployment process: First validate the Vite/TypeScript setup, then the asset migration, followed by websocket integration, and finally, Express route adjustments.
  - Implement unit tests and manual testing especially for real-time websocket data handling.

## TODO List

- [x] **Vite & TypeScript Setup**
  - [x] Create a new client directory (e.g., `/client/config`) for the React config page.
  - [x] Install dependencies: React, ReactDOM, Vite, and TypeScript.
  - [x] Create and configure `vite.config.ts` for React and TypeScript.
  - [x] Update `package.json` scripts for development and build.
  - [x] Verify the development server starts without errors.
  - [x] Test that TypeScript compilation works correctly.
  - [x] Ensure hot module reloading is functioning.

- [x] **Asset Migration**
  - [x] Create `ConfigPage.tsx` as the entry React component.
  - [x] Convert static HTML from `public/config-page/index.html` into JSX (TypeScript).
  - [x] Refactor and modularize CSS from `public/config-page/config-page.css`.
  - [x] Organize static images and other assets within the component directory.
  - [x] Create TypeScript interfaces for component props.
  - [x] Set up CSS modules or styled-components configuration.
  - [x] Test that all components render correctly.

- [x] **Websocket Integration**
  - [x] Develop a React hook or context in TypeScript for managing websocket state.
  - [x] Create TypeScript interfaces for websocket message types.
  - [x] Integrate the hook/context into the config page component to provide real-time data.
  - [x] Test websocket connection and state updates.
  - [ ] Implement error handling and reconnection logic.
  - [x] Verify real-time updates work as expected.

- [x] **Express Integration**
  - [x] Integrate Vite dev server middleware in development mode.
  - [x] Configure static file serving for production builds.
  - [x] Test the production build process.
  - [x] Set up environment-aware routing logic.
  - [ ] Configure proper caching headers and error handling.
  - [x] Verify routes work in both development and production.

- [ ] **Testing & Deployment**
  - [ ] Implement unit tests for React components.
  - [ ] Add integration tests for websocket functionality.
  - [x] Test the full application flow end-to-end.
  - [x] Verify production build optimization.
  - [x] Document development and production workflows.
  - [ ] Create backup of current static implementation.
  - [ ] Plan rollback strategy if needed.