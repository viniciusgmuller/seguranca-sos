# Stage 1: Install dependencies
FROM oven/bun:1 AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Stage 2: Build
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Provide dummy DATABASE_URI for build (Payload validates config at build time)
# Real connection happens at runtime
ENV DATABASE_URI=postgresql://dummy:dummy@localhost:5432/dummy
ENV PAYLOAD_SECRET=build-time-secret-not-used
RUN bun run build

# Stage 3: Production runtime
FROM oven/bun:1 AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /app ./

EXPOSE 3000
CMD ["bun", "next", "start"]
