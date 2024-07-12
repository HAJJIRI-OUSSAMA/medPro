FROM node:alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install

RUN yarn build

ENV NODE_ENV=production

CMD ["node","dist/app.js"]