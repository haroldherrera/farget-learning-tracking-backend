FROM node:22

WORKDIR /app

COPY /package.json /app

RUN npm install 

COPY . /app

ENV CORS_ORIGINS=http://localhost:51730,https://www.development.mastersweb.click,https://development.mastersweb.click,https://www.stage.mastersweb.click,https://stage.mastersweb.click


RUN npm run build

CMD [ "node" , "./dist/app.js"]

EXPOSE 3000




