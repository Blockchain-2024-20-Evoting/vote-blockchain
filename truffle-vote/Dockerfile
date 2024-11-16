# Base ligera
FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Instalar Truffle
RUN npm install -g truffle \
    && npm config set bin-links false

# Copiar contratos y archivos necesarios
COPY contracts ./contracts
COPY migrations ./migrations
COPY truffle-config.js ./truffle-config.js

# Preinstalar dependencias si existen
COPY package.json package-lock.json ./
RUN npm install

# Comando por defecto
CMD ["truffle", "compile"]
