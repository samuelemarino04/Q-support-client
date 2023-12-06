# Use a base image with Node.js
FROM node:latest

# Copy package.json and package-lock.json
COPY . ./var/www

# Set the working directory
WORKDIR /var/www

# Install dependencies
RUN npm install

# Build your application
RUN npm run build

ENV VITE_API_URL=http://localhost:5005/api
ENV VITE_APP_NAME=CreativesQ+ 
ENV VITE_MAPS_API_KEY=AIzaSyBsRneeSd2He0UERMXg95M7mefD9lDZNJM

# Expose the port your app will run on
EXPOSE 80

# Command to run your application
CMD ["npm", "start"]
