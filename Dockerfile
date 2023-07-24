# Build stage
FROM node:16.14.2 as build-env

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:16.14.2-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY .env.production ./

COPY --from=build-env /app/dist ./dist

EXPOSE 4050

CMD ["npm", "run", "start:prod"]
