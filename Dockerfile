FROM node:slim

WORKDIR /api

COPY package.json .
COPY yarn.lock .

RUN apt-get update && \
    apt-get install -y make gcc g++ python3 && \
    yarn install && \
    yarn add bcrypt --force 

COPY . .

EXPOSE 5173

CMD ["yarn", "start:hmr"]
