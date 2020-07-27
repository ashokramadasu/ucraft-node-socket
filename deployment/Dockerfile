FROM node:10.13.0-alpine

# Set env as production
ENV NODE_ENV=production

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install app dependencies
COPY package*.json ./


RUN npm install --only=production

# Bundle app source
COPY . .

CMD [ "npm", "start" ]