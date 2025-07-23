# Etapa 1: build da aplicação com Node
FROM node:18-alpine AS build

WORKDIR /app

# Copia os arquivos de dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Gera o build estático com Vite
RUN npm run build

# Etapa 2: Serve os arquivos estáticos com nginx
FROM nginx:stable-alpine

# Copia o build do estágio anterior para a pasta do nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponha a porta padrão do nginx
EXPOSE 80

# Comando para rodar o nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
