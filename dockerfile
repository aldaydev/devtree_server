# Etapa 1: build
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install   # instala todas las dependencias, no solo las de prod

COPY . .

RUN npm run build  # Aquí corre el compilador TypeScript

# Etapa 2: ejecución
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 4000

CMD ["npm", "start"]