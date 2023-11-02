FROM node:18.18.0

WORKDIR /usr/src/app
COPY ./ ./
RUN chmod +x /usr/src/app/scripts/startup.sh

RUN yarn install --frozen-lockfile

RUN yarn build

ENTRYPOINT ./scripts/startup.sh
