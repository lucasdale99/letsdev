# Add the base Image.
FROM node:20-alpine AS base

# Install dependencies only when needed.
FROM base AS deps

# Install packages with no cache
RUN apk add --no-cache libc6-compat

# Install dependencies based on the preferred package manager
WORKDIR /app
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile; 

#Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

#Run Build
RUN corepack enable pnpm && pnpm run build

#Production Image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

#creates a system group named nodejs and nextjs
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

#copy the file from to public folder 
COPY --from=builder /app/public ./public

#Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

#Reduce Image Size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

#Expose the port: Next.js by default is port 3000 
#If In your application running different port then change the expose port.
USER nextjs
# if in your application 3000 will not run, then change the expose port
# ex: EXPOSE <port>
EXPOSE 3000

# set Environment port
ENV PORT 3000

#server.js is created by next build from the standalone output
CMD ["node", "server.js"]
