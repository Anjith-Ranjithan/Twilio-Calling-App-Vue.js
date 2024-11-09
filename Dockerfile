# Use the official Node.js image with a lightweight Alpine variant
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vue.js application
RUN npm run build

# Install the 'serve' package globally to serve the static files
RUN npm install -g serve

# Expose port 8080 for the application
EXPOSE 8080

# Command to serve the app using 'serve'
CMD ["serve", "-s", "dist", "-l", "8080"]
