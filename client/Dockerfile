# syntax=docker/dockerfile:1

FROM oven/bun:1 as base

WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
EXPOSE 5173
CMD ["bun", "dev"]
