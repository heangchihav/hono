# Use bun official image
FROM jarredsumner/bun:edge

WORKDIR /app

# Copy backend source code
COPY ./src ./src
COPY ./package.json ./package.json
# Use bun.lock instead of bun.lockb

# Install dependencies
RUN bun install

# Build backend (if needed)
# For TS projects, you may want to add a build step here
# If using Bun's native TS support, you can skip this

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]
