import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeAll, afterEach, afterAll } from "vitest";
import { MockWebServer } from "../src/test-utils/http/mock-web-server";

export const mockWebServer = new MockWebServer();

beforeAll(() => mockWebServer.start());
afterEach(() => {
  mockWebServer.resetHandlers();
  cleanup();
});
afterAll(() => mockWebServer.close());
