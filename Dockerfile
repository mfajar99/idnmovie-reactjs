FROM node:20

WORKDIR /app

COPY package* .
RUN npm i

COPY . .

CMD [ "nom", "run", "dev" ]