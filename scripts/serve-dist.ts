const dist = `${process.cwd()}/dist`;
const port = Number(process.env.PORT ?? 4173);

function typeFor(pathname: string) {
  if (pathname.endsWith(".html")) return "text/html; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  return "application/octet-stream";
}

Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === "/") pathname = "/index.html";
    if (pathname === "/menu") pathname = "/menu.html";
    if (pathname === "/about") pathname = "/about.html";
    const file = Bun.file(`${dist}${pathname}`);
    if (await file.exists()) return new Response(file, { headers: { "content-type": typeFor(pathname) } });
    return new Response("Not found", { status: 404 });
  },
});

console.log(`Static dist server running at http://127.0.0.1:${port}`);
