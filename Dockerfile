# Dockerfile
FROM node:20-alpine

# Sets the working directory
WORKDIR /cryptocurrency

# Bash available
RUN apk add --no-cache bash

# Copy dependencies first to use the Docker cache
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Exposes the Remix/React port (Remix uses 5173 by default)
EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
