# Dockerfile para o projeto Node.js (TypeScript)
FROM node:20-alpine AS builder

WORKDIR /app

# Instala dependências
COPY package.json package-lock.json* ./
RUN npm install --frozen-lockfile || npm install

# Copia o restante do código
COPY . .

# Build do projeto
RUN npm run build

# ---
# Imagem final
FROM node:20-alpine
WORKDIR /app

# Copia apenas o build e as dependências de produção
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/.env ./

EXPOSE 3000
CMD ["node", "build/server.js"]
