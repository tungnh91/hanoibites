const root = process.cwd();
const dist = `${root}/dist`;
const port = Number(process.env.PORT ?? 4173);

function typeFor(pathname: string) {
  if (pathname.endsWith(".html")) return "text/html; charset=utf-8";
  if (pathname.endsWith(".css")) return "text/css; charset=utf-8";
  if (pathname.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (pathname.endsWith(".png")) return "image/png";
  if (pathname.endsWith(".jpg") || pathname.endsWith(".jpeg")) return "image/jpeg";
  if (pathname.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

async function runChrome(args: string[], timeoutMs = 20_000) {
  const proc = Bun.spawn(args, { stdout: "pipe", stderr: "pipe" });
  const timer = setTimeout(() => proc.kill(), timeoutMs);
  try {
    const code = await proc.exited;
    if (code !== 0) {
      const err = await new Response(proc.stderr).text();
      throw new Error(`Chrome exited ${code}: ${err}`);
    }
  } finally {
    clearTimeout(timer);
  }
}

const server = Bun.serve({
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

const chrome = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const pages = ["home:/", "menu:/menu", "about:/about"];
await Bun.$`mkdir -p screenshots`;

try {
  for (const pair of pages) {
    const [name, route] = pair.split(":");
    for (const spec of ["1440x1600", "390x1200"]) {
      const [w, h] = spec.split("x");
      await runChrome([
        chrome,
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--hide-scrollbars",
        `--window-size=${w},${h}`,
        "--virtual-time-budget=3500",
        `--screenshot=${root}/screenshots/${name}-${w}.png`,
        `http://127.0.0.1:${port}${route}`,
      ]);
    }
  }
  console.log(`Screenshots written to ${root}/screenshots`);
} finally {
  server.stop(true);
}
