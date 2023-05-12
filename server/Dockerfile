FROM node:18-alpine

WORKDIR /app/
COPY package*.json tsconfig.build.json tsconfig.json orm.config.ts /app/
COPY src /app/src
RUN npm install && npm run build

CMD ["npm", "run", "start"]
