# Plan to Migrate the Config Page to React (TypeScript) with Vite

This plan outlines the steps to transform the existing static config page into a React-based application using Vite and TypeScript. The existing ExpressJS server will continue handling routes, APIs, and websocket state synchronization.

## Overview

- **Repository Integration:**  
  The React config page will be integrated within the current repository. Static assets from `public/config-page` (HTML, CSS, images) will be migrated and refactored into React components written in TypeScript.

- **Tooling & Build Process:**  
  Vite will be used as the build tool to bundle and serve the React (TypeScript) components. The ExpressJS server will be updated to serve the output of the Vite build on the `/config` route.

- **Features:**  
  - Use React and TypeScript for modular, type-safe UI development.
  - Migrate static assets (HTML/CSS/images) from the existing config page into React components.
  - Integrate websocket state (existing implementation in `src/ws.ts`) with React via hooks or context for real-time updates.
  - Retain Express routes and API functionalities, modifying only the route handling to serve the new React app.

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
- **Task:** Modify the ExpressJS route that handles `/config` to serve the Vite-built React application.
- **Subtasks:**
  - Update `src/routes/config-route.ts` to serve static files from the Vite output.
  - Ensure correct resolution of static assets and client-side navigation.
  - Optionally, during development, configure Vite's middleware for hot module reloading.

### 5. Testing & Iterative Deployment
- **Task:** Create and maintain a markdown document with a detailed TODO list to track progress.
- **Subtasks:**
  - List tasks with subtasks, estimated time, and testing steps.
  - Follow an iterative deployment process: First validate the Vite/TypeScript setup, then the asset migration, followed by websocket integration, and finally, Express route adjustments.
  - Implement unit tests and manual testing especially for real-time websocket data handling.

## Mermaid Diagram

```mermaid
flowchart TD
    A[Static Config Page]
    B[Set up Vite with React and TypeScript]
    C[Migrate HTML/CSS to TypeScript React Components]
    D[Integrate Websocket State via TypeScript Hooks/Context]
    E[Update Express Route (/config) to Serve React App]
    F[Test & Debug]
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
```

## TODO List

- [ ] **Vite & TypeScript Setup**
  - [ ] Create a new client directory (e.g., `/client/config`) for the React config page.
  - [ ] Install dependencies: React, ReactDOM, Vite, and TypeScript.
  - [ ] Create and configure `vite.config.ts` for React and TypeScript.
  - [ ] Update `package.json` scripts for development and build.
  - [ ] Verify the development server starts without errors.
  - [ ] Test that TypeScript compilation works correctly.
  - [ ] Ensure hot module reloading is functioning.

- [ ] **Asset Migration**
  - [ ] Create `ConfigPage.tsx` as the entry React component.
  - [ ] Convert static HTML from `public/config-page/index.html` into JSX (TypeScript).
  - [ ] Refactor and modularize CSS from `public/config-page/config-page.css`.
  - [ ] Organize static images and other assets within the component directory.
  - [ ] Create TypeScript interfaces for component props.
  - [ ] Set up CSS modules or styled-components configuration.
  - [ ] Test that all components render correctly.

- [ ] **Websocket Integration**
  - [ ] Develop a React hook or context in TypeScript for managing websocket state.
  - [ ] Create TypeScript interfaces for websocket message types.
  - [ ] Integrate the hook/context into the config page component to provide real-time data.
  - [ ] Test websocket connection and state updates.
  - [ ] Implement error handling and reconnection logic.
  - [ ] Verify real-time updates work as expected.

- [ ] **Express Integration**
  - [ ] Modify `/config` route in `src/routes/config-route.ts` to serve the Vite build output.
  - [ ] Verify that all client-side routes and static assets load correctly.
  - [ ] Test the production build process.
  - [ ] Configure proper error handling and fallbacks.
  - [ ] Ensure proper caching headers are set.
  - [ ] Verify that the Express server correctly handles all routes.

- [ ] **Testing & Deployment**
  - [ ] Implement unit tests for React components.
  - [ ] Add integration tests for websocket functionality.
  - [ ] Test the full application flow end-to-end.
  - [ ] Verify production build optimization.
  - [ ] Document any necessary deployment steps.
  - [ ] Create backup of current static implementation.
  - [ ] Plan rollback strategy if needed.