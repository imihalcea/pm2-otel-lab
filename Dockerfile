FROM node:20-alpine

# PM2 for running in a container
RUN npm i -g pm2@5

WORKDIR /app
COPY app/package.json ./
ENV NODE_PATH=/app/node_modules
RUN npm install --omit=dev

COPY app/. ./

# Copy the OTEL bootstrap outside the app
COPY otel/tracing.cjs /opt/otel/tracing.cjs

# Directory for app logs (tailed by the Collector)
RUN mkdir -p /var/log/app

EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.cjs", "--env", "production"]
