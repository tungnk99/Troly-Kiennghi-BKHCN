FROM node:20-alpine

WORKDIR /app

COPY server.js   ./
COPY index.html  ./
COPY styles.css  ./
COPY script.js   ./
COPY Input/      ./Input/

EXPOSE 3000

CMD ["node", "server.js"]
