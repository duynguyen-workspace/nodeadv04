FROM node

WORKDIR /home/api-gateway

COPY package*.json .

RUN yarn config set network-timeout 3000000

RUN yarn 

COPY . .

RUN yarn run build

EXPOSE 8081

CMD ["yarn", "start:prod"]

# docker build . -t api-gateway

# docker run -d -p 8081:8081 --name api-gateway api-gateway
