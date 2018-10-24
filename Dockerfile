FROM node:8.12.0-alpine
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
RUN yarn global add serve
CMD serve -p $PORT -s build
