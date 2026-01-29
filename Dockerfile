# Stage 1: Build the React Client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# Stage 2: Setup the Node Server
FROM node:18-alpine
WORKDIR /app
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy Server Code
COPY server/ ./server/

# Copy Built Client Assets to Server Public (or where server serves static)
# Assuming server is configured to serve static files from client/dist or similar
# For now, we keep them separate or assume serving strategy.
# Let's copy them to a 'public' folder in server
COPY --from=client-build /app/client/dist ./server/public

# Expose Port
EXPOSE 5000

# Start Server
WORKDIR /app/server
CMD ["node", "index.js"]
