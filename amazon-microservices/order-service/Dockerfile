FROM node

WORKDIR /home/order-service

COPY package*.json .

RUN yarn config set network-timeout 3000000

RUN yarn 

COPY ./src/prisma ./src/prisma

RUN yarn prisma generate --schema ./src/prisma/schema.prisma

COPY . .

RUN yarn run build

CMD ["yarn", "start:prod"]

# docker build . -t order-service

# docker run -d --net nodeadv04-net --name order-service order-service

