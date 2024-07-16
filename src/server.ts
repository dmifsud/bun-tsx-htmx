import { render } from "preact-render-to-string";
import { Home, HomeItem, renderBase } from "./templates/Home";
// import { join, readFile, getContent } from "bun";

Bun.serve({
  port: 3000,
  async fetch(req) {
    const url = new URL(req.url);

    // static files
    if (url.pathname.startsWith("/dist")) {
      const file = Bun.file('.' + url.pathname);
      return new Response(file);
    }

    if (req.method === "POST") {
      if (url.pathname === "/add-person") {
        const data = await req.formData();
        const firstName = data.get('firstName')?.toString() ?? ''
        return new Response(render(HomeItem({ person: firstName })), {
          headers: { "Content-Type": "text/html" },
        });
      }
    }

    return new Response(renderBase(Home()), {
      headers: { "Content-Type": "text/html" },
    });
  },
});

console.log('Listening on localhost:3000')