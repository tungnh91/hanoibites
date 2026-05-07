import { describe, expect, test } from "bun:test";

const read = (path: string) => Bun.file(path).text();

describe("Bun static Hanoi Bites clone", () => {
  test("uses the requested Bun + HTML + CSS stack without framework deps", async () => {
    const pkg = JSON.parse(await read("package.json"));
    expect(pkg.dependencies ?? {}).toEqual({});
    expect(pkg.scripts.build).toContain("bun build ./index.html ./menu.html ./about.html");
    expect(await Bun.file("vercel.json").exists()).toBe(true);
  });

  test("all pages include cloned Hanoi Bites copy and local assets", async () => {
    const home = await read("index.html");
    const menu = await read("menu.html");
    const about = await read("about.html");

    expect(home).toContain("The flavours of our Hanoi home");
    expect(home).toContain("./assets/hero.jpeg");
    expect(menu).toContain("Pork Sizzlers");
    expect(menu).toContain("VERMICELLI (BÚN) BOWL");
    expect(about).toContain("I grew up in Hanoi");
    expect(about).toContain("./assets/about.png");
  });

  test("CSS matches captured Squarespace design tokens", async () => {
    const css = await read("styles.css");
    expect(css).toContain("--white-hsl: 42 35.71% 94.51%");
    expect(css).toContain("--black-hsl: 30 12.5% 18.82%");
    expect(css).toContain("font-family: 'Libre Baskerville'");
    expect(css).toContain("font-family: 'Almarai'");
    expect(css).toContain("--page-padding: 4vw");
  });
});
