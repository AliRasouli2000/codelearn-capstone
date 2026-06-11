import "@testing-library/jest-dom";

const { TextDecoder, TextEncoder } = require("node:util");
const { clearImmediate, setImmediate } = require("node:timers");
const { ReadableStream, TransformStream, WritableStream } = require("node:stream/web");

global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;
global.ReadableStream = global.ReadableStream || ReadableStream;
global.TransformStream = global.TransformStream || TransformStream;
global.WritableStream = global.WritableStream || WritableStream;
global.clearImmediate = global.clearImmediate || clearImmediate;
global.setImmediate = global.setImmediate || setImmediate;

if (typeof global.performance !== "undefined" && typeof (global.performance as any).markResourceTiming !== "function") {
  (global.performance as any).markResourceTiming = jest.fn();
}

const { fetch, Headers, Request, Response } = require("next/dist/compiled/@edge-runtime/primitives/fetch.js");

process.env.TOKEN_SECRET = process.env.TOKEN_SECRET || "test-token-secret";
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

global.fetch = global.fetch || fetch;
global.Headers = global.Headers || Headers;
global.Request = global.Request || Request;
global.Response = global.Response || Response;

if (typeof window !== "undefined") {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
}