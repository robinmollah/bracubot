FROM node:alpine
RUN apk add g++ make py3-pip
WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 8085

CMD ["npm", "start"]
