FROM node:bullseye-slim
COPY . .
RUN npm install -g pnpm && pnpm install 
CMD ["pnpm","run","prod"]