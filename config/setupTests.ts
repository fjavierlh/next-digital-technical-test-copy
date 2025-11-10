import "@testing-library/jest-dom/vitest";
import { beforeAll, afterEach, afterAll } from "vitest";
import { MockWebServer } from "../src/test-utils/http/mock-web-server";

export const mockWebServer = new MockWebServer();

beforeAll(() => mockWebServer.start());
afterEach(() => mockWebServer.resetHandlers());
afterAll(() => mockWebServer.close());
