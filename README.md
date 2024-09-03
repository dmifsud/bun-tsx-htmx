# bun-tsx-htmx

To install dependencies:

```bash
bun install
```

To run server and frontend dev together:

```bash
bun run dev
```

# Production build

```bash
bun run build
```
then to test:
```bash
bun run serve
```

## Overview

This project is a proof of concept for testing out the following tech stack:

- Front End:
  - HTMx
  - Hyper Validate (https://github.com/dmifsud/hyper-validate)
  - Custom Vanilla JS (TS) 
  - Tailwind (CSS)
- Back End:
  - Language: TypeScript
  - Platform: Bun
  - Server: Hono
  - Template Engine: Preact (TSX)
- Database:
  - MongoDB (Atlas)
  - Mongoose
- Build:
  - Vite
- Test:
  - Vitest (WIP)

This project was created using `bun init` in bun v1.1.19. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
