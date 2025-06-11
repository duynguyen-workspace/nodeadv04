FROM node

COPY package*.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "run", "dev"]

# docker build . -t amazon-main

# docker run -d -p 3002:3000 --name amazon-main amazon-main