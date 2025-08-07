FROM node

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5003

CMD ["npx", "nodemon", "--watch", ".", "src/server.ts"]

