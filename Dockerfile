FROM node:bullseye-slim
COPY . .
RUN npm install
RUN npm run build
RUN mkdir ./dist/logs/ && touch ./dist/logs/app.log
CMD ["node", "./dist/app.js"]
