FROM node:lts-alpine
RUN npm install -g json-server
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
EXPOSE 3001
RUN chown -R node /usr/src/app
USER node
CMD ["json-server", "./db.json", "--host", "0.0.0.0", "--port", "3001", "--no-cors"]

