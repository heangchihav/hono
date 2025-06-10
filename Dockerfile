FROM oven/bun:1.2 as base

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Start the application
CMD ["bun", "run", "start"]
