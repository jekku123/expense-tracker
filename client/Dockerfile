# syntax=docker/dockerfile:1

FROM oven/bun:1 as build

WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
# EXPOSE 5173
ENV NODE_ENV production
RUN bun run build
# CMD ["bun", "dev"]

# FROM node:${NODE_VERSION}-alpine as development
# WORKDIR /usr/src/app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx:1.23-alpine as production
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /usr/src/app/dist/ .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
