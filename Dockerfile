FROM node:alpine

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

CMD npm run start