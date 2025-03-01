FROM node:22-alpine

RUN npm i -g pnpm@9
RUN npm i -g @nestjs/cli

WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN pnpm install

COPY . .

RUN pnpm build

CMD [ "pnpm", "start"]