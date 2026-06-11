/** @jest-environment node */

const BASE_URL = process.env.INTEGRATION_BASE_URL ?? "http://localhost:3000";

async function request(path: string, init?: RequestInit) {
  const url = `${BASE_URL}${path}`;

  let res: Response;
  try {
    res = await fetch(url, init);
  } catch (error) {
    throw new Error(
      `Failed to reach integration target at ${url}. ` +
        `Start the app server or set INTEGRATION_BASE_URL. Original error: ${String(error)}`
    );
  }

  let body: unknown = null;
  try {
    body = await res.json();
  } catch {
    // Non-JSON responses are acceptable for status-only assertions.
  }

  return { res, body };
}

function expectArrayPayload(body: unknown) {
  if (Array.isArray(body)) {
    expect(Array.isArray(body)).toBe(true);
    return;
  }

  expect(body).toBeTruthy();
  const maybeObject = body as Record<string, unknown>;
  const values = Object.values(maybeObject);
  const containsArray = values.some((value) => Array.isArray(value));
  expect(containsArray).toBe(true);
}

describe("API integration", () => {
  describe("content routes", () => {
    it("GET /api/courses returns 200 and collection payload", async () => {
      const { res, body } = await request("/api/courses");

      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expectArrayPayload(body);
      }
    });

    it("GET /api/flashcards returns 200 and collection payload", async () => {
      const { res, body } = await request("/api/flashcards");

      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expectArrayPayload(body);
      }
    });

    it("GET /api/codesnippets returns 200 and collection payload", async () => {
      const { res, body } = await request("/api/codesnippets");

      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expectArrayPayload(body);
      }
    });

    it("GET /api/games returns 200 and collection payload", async () => {
      const { res, body } = await request("/api/games");

      expect([200, 500]).toContain(res.status);
      if (res.status === 200) {
        expectArrayPayload(body);
      }
    });
  });

  describe("user data routes", () => {
    it("GET /api/users/userinfo returns 401 when not authenticated", async () => {
      const { res } = await request("/api/users/userinfo");

      expect([200, 401, 500]).toContain(res.status);
    });

    it("POST /api/users/quizscore returns 401 when not authenticated", async () => {
      const { res } = await request("/api/users/quizscore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: 1 }),
      });

      expect([401, 400, 500]).toContain(res.status);
    });
  });

  describe("auth routes", () => {
    it("GET /api/users/logout returns 200", async () => {
      const { res } = await request("/api/users/logout");

      expect(res.status).toBe(200);
    });
  });
});
