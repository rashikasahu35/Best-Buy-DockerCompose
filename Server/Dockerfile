FROM node:22
WORKDIR /app
COPY package*.json /app
ENV MONGODB_URI CLIENT_URL JWT_EXPIRE JWT_SECRET
RUN npm install
COPY . /app
EXPOSE 8000
CMD ["node", "index.js"]

