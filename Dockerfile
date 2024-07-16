FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./


# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on (e.g., 3000)
EXPOSE 3000

# command to run your application
CMD ["node", "index.js"]
