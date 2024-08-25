# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=20.16.0
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

# Install pnpm
ARG PNPM_VERSION=9.8.0
RUN npm install -g pnpm@$PNPM_VERSION


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential node-gyp pkg-config python-is-python3

# Install node modules
#COPY --link package.json pnpm-lock.yaml ./
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy application code
#COPY --link . .
COPY . .

# Build the TypeScript code
RUN pnpm run build

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

# Copy the package.json file to the final image
COPY package.json ./

# Copy the public folder directly to the container
COPY public /app/public

# Expose both ports 3000 and 3001
EXPOSE 3000
EXPOSE 3001

CMD [ "node", "dist/index.js" ]
#CMD ["sh"]