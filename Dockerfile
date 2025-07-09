FROM node:22.17-alpine3.21 AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile

COPY . .


RUN npm run build

# Imagem final
FROM node:22.17-alpine3.21

WORKDIR /app

COPY package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
#COPY --from=builder /app/.env ./

EXPOSE 3000
CMD ["node", "build/server.js"]
