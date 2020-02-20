FROM  node:dubnium

RUN yarn global add @quasar/cli

RUN mkdir -p /usr/src/
WORKDIR /usr/src/
COPY . /usr/src/
COPY package.json /usr/src/

RUN yarn install
RUN yarn build

WORKDIR /usr/src/dist/ssr

CMD yarn start
