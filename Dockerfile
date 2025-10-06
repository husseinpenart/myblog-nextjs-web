# ----------- Build Stage -----------
FROM node:20-slim AS build
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm install

# Copy project files
COPY . .

# Build Next.js app
RUN npm run build

# ----------- Runtime Stage -----------
FROM node:20-slim AS runtime
WORKDIR /app

# Copy only necessary files for production
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built assets and public files from build stage
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/server.js ./

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start Next.js
CMD ["npm", "start"]
