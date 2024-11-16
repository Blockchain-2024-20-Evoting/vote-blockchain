FROM node:20-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Instalar Truffle
RUN npm install -g truffle \
    && npm config set bin-links false \
    && npm cache clean --force  # Limpiar caché después de instalar Truffle

# Copiar solo package.json (sin package-lock.json)
COPY package.json ./

# Instalar dependencias
RUN npm install \
    && npm cache clean --force  # Limpiar caché después de instalar dependencias

# Copiar contratos y archivos necesarios
COPY contracts ./contracts
COPY migrations ./migrations
COPY truffle-config.js ./truffle-config.js

# Comando por defecto
CMD ["truffle", "compile"]