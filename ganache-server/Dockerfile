# Utilizar una imagen base de Node.js (slim para reducir el tamaño de la imagen)
FROM node:20-slim

# Establecer directorio de trabajo en el contenedor
WORKDIR /app

# Actualizar los paquetes del sistema e instalar dependencias necesarias
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# Instalar Ganache CLI y limpiar cache de npm para reducir el tamaño de la imagen
RUN npm install -g ganache-cli && npm cache clean --force

# Exponer el puerto RPC de Ganache, leyendo el puerto de la variable de entorno
EXPOSE ${PORT}

# Ejecutar Ganache usando las variables de entorno que se pasarán desde .env
CMD ["sh", "-c", "ganache-cli -h $HOST -p $PORT -m \"$MNEMONIC\" --gasLimit $GAS_LIMIT --networkId $NETWORK_ID"]