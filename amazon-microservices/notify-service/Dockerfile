FROM node

WORKDIR /home/notify-service

COPY package*.json .

RUN yarn config set network-timeout 3000000

RUN yarn 

COPY . .

RUN yarn run build

CMD ["yarn", "start:prod"]

# docker build . -t notify-service

# docker run -d --net nodeadv04-net --name notify-service notify-service

