FROM --platform=linux/amd64 node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Build
RUN npm run build

EXPOSE 8080
