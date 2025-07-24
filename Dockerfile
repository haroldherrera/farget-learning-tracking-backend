FROM node:22

WORKDIR /app

COPY /package.json /app

RUN npm install 

COPY . /app

RUN npm run build

CMD [ "node" , "./dist/app.js"]

EXPOSE 3000




