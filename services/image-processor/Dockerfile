FROM node:14-alpine

WORKDIR /app

COPY package-lock.json package.json tsconfig.json /app/

ADD src/ src/

RUN npm run install-build

CMD node dist/app.js

EXPOSE 3001
