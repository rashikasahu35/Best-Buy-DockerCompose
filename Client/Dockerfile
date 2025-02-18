FROM node:22-alpine
WORKDIR /app
COPY package.json /app
# install curl for healthcheck
RUN npm i && npm i -g serve && apk add --no-cache curl  
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "serve", "-s", "dist" ]
