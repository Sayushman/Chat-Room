# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy server files and install dependencies
COPY nodeServer/package*.json ./nodeServer/
RUN cd nodeServer && npm install

# Copy the rest of the project files
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Run the server
CMD ["node", "nodeServer/server.js"]

