FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy ALL files and directories
COPY . .

EXPOSE 3002

CMD ["npm", "start"]