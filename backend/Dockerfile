#Dockerfile Backend
# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["npm", "run", "dev"]
