#Dockerfile Frontend
# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files
COPY . .

# Expose frontend port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
