import { defineConfig } from "vitest/config";

// Node 22+ ships its own Web Storage `localStorage`, which stays undefined unless
// you run with --localstorage-file. It is a non-enumerable own property of
// globalThis, so vitest's jsdom environment (which copies the jsdom window's
// enumerable keys onto the global) never installs jsdom's real Storage over it,
// and every test touching localStorage/sessionStorage fails with
// "Cannot read properties of undefined". Dropping Node's builtin hands the
// global back to jsdom.
//
// The flag does not exist before Node 22 and Node exits on an unknown flag, so
// the option is omitted entirely on older runtimes: CI is on Node 20 and is
// unaffected by this block. Remove it once local and CI Node versions match.
const nodeMajor = Number(process.versions.node.split(".")[0]);
const execArgv = ["--no-experimental-webstorage"];
const nodeStorageFix =
  nodeMajor >= 22
    ? { poolOptions: { forks: { execArgv }, threads: { execArgv } } }
    : {};

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    ...nodeStorageFix,
  },
});
