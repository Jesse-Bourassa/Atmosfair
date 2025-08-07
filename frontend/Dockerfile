# ─── Dockerfile (multi‑stage) ──────────────────────────────────────────
# 1) Build stage
FROM node:18-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build         # puts static files in /app/dist

# 2) Production stage – tiny nginx image that just serves /dist
FROM nginx:alpine AS production

# Copy the built static files to the nginx web root
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the web server port
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
