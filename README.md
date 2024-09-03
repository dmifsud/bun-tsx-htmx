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

## Comments

This proof of concept (POC) showcases an architecture design following the principles of Hypermedia-Driven Applications (HDA). The implementation leverages the power of native browser-supported hypermedia approaches, utilizing HTML and HTTP, enriched by HTMx, and other custom solutions such as HyperValidate. These components work together to enable a reactive and declarative web experience, where the server drives the state and behavior of the application through hypermedia controls.

Given that many Front End Developers are familiar with React's templating approach, this backend server-side rendering employs Preact's JSX. This choice maintains a similar developer experience while enabling server-side rendering. The use of TypeScript further enhances this setup by providing static types, ensuring code quality and maintainability.

### Key Features of this HDA Implementation:
- **HTMx Integration:** HTMx facilitates hypermedia-driven interactions directly within the browser, reducing the need for heavy JavaScript frameworks on the client side.

- **Preact JSX on Server:** Preact's JSX is used server-side to render views, providing a React-like development experience while focusing on performance and simplicity.

- **Bun as the Runtime:** Bun is leveraged for its performance benefits, acting as the runtime environment for this application.

- **Hono Middleware:** Hono handles routing and middleware, ensuring that requests are processed efficiently and correctly.

- **Mongoose for MongoDB:** Mongoose is used to interact with MongoDB, offering a structured approach to data modeling and management.

- **TypeScript:** The entire application is written in TypeScript, ensuring strong typing and reducing potential runtime errors.

This architecture adheres to the principles of HDA by allowing the server to drive the application's behavior, reducing client-side complexity, and embracing a more declarative, hypermedia-driven approach to web development.

### Additional Notes on HDA (Hypermedia-Driven Applications):

Hypermedia-Driven Applications rely on the principle that the server provides not just data but also controls (links, forms, etc.) that guide the client in interacting with the application. This approach aligns closely with the REST architectural style, where the server defines the available actions through hypermedia, allowing for a more decoupled and flexible client-server relationship.

In this POC, HTMx plays a critical role in enabling this by allowing the server to dynamically update parts of the UI without requiring a full-page refresh or heavy client-side JavaScript whilst keeping an SPA feel. This keeps the application lightweight and responsive while maintaining a clean separation between client and server logic.

## References

https://htmx.org/essays/hypermedia-driven-applications/

https://hypermedia.systems/book/contents/


This project was created using `bun init` in bun v1.1.19. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
