ARG NODE_VERSION=20.11.0

FROM node:${NODE_VERSION}-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

ENV DATABASE_URL file:/app/db/prod.db

RUN npx prisma generate

RUN npm run build

ENV NODE_ENV production

CMD ["npm", "run", "start"]
