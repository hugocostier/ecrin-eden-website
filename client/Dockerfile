# Developent stage 
FROM node:20 AS Development 
WORKDIR /app/client 
COPY package*.json . 
RUN npm install --only=development 

# Build stage 
FROM Development AS Build 
COPY . . 
RUN npm run build 

# Production stage  
FROM node:20 AS Production 
ENV NODE_ENV=production 
WORKDIR /app/client
COPY --from=Build /app/client/dist /app/client/dist
CMD [ "npm", "run", "start:production" ]
