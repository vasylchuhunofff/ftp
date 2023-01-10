FROM node:lts-alpine
RUN npm install -g http-server
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY . .
EXPOSE 80
RUN chown -R node /usr/src/app
USER node
CMD ["http-server", "-p=80"]

