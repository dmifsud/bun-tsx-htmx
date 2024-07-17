// https://github.com/Pallepadehat/bun-template/blob/main/server/index.ts
import HonoApp from './app.hono';

Bun.serve(HonoApp);


console.log(`Listening on localhost:${process.env.PORT || 8080}`);