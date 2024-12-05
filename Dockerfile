#!/bin/bash
FROM node:20.18.1-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install necessary dependencies
RUN npm install --force

# Install serve globally for production
RUN npm install -g serve

# Copy the rest of the application files to the container
COPY . .

# Optional: Run additional build/deployment commands if needed
RUN npm run deploy || echo "Deployment script skipped."

# Expose the application port
EXPOSE 3000

# Set the container's default startup command
# If you want to run in development mode with Vite:
#CMD ["npm", "run", "start"]

# Alternatively, if you want to serve the production build:
CMD ["serve", "-s", "dist", "-l", "3000"]
