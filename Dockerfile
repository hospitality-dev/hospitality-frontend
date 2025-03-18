FROM oven/bun:latest AS builder
WORKDIR /app

# Install dependencies and build
COPY bun.lock package.json ./
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# Serve with a lightweight web server
FROM oven/bun:latest AS runner
COPY --from=builder /app/shell/dist /app/dist

# Expose port 5173
EXPOSE 5173

# Use Bun to serve the built files
CMD ["bun", "x", "serve", "dist", "--single", "--port", "3000"]