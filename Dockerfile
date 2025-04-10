# Estágio de build
FROM node:18-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package.json package-lock.json* ./

# Instalar dependências
RUN npm i --force

# Copiar código fonte
COPY . .

# Construir a aplicação
RUN npm run build

# Estágio de produção
FROM node:18-alpine AS runner

WORKDIR /app

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production

# Copiar dependências e arquivos de build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expor porta
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

