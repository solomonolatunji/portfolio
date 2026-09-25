FROM node:22-bookworm-slim AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:22-bookworm-slim AS runtime

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app
COPY --from=build --chown=node:node /app/.output ./.output

WORKDIR /app/.output/server
RUN npm install --omit=dev

USER node

EXPOSE 3000
CMD ["node", "index.mjs"]
