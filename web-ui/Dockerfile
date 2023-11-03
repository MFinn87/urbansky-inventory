FROM node:18.18.0

WORKDIR /usr/src/app
COPY ./ ./

RUN yarn install --frozen-lockfile

RUN yarn build

CMD yarn start
