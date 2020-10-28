FROM node:13.14.0-alpine

COPY package*.json ./

RUN npm cache clean --force
RUN npm i

COPY . .

RUN npm run build

EXPOSE 8080

CMD npm run start