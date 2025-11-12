import { type DefaultBodyType, http, HttpResponse, type PathParams } from "msw";
import { type SetupServer, setupServer } from "msw/node";

export type Method = "get" | "post" | "put";

export interface MockHandler<T extends DefaultBodyType> {
  method: Method;
  endpoint: string;
  httpStatusCode: number;
  response: T;
}

export type ResolverArgs = {
  request: globalThis.Request;
  params: PathParams;
  cookies: Record<string, string>;
};

export interface MockHandlerResolver<T extends DefaultBodyType> {
  method: Method;
  endpoint: string;
  httpStatusCode: number;
  response: (args: ResolverArgs) => T | Promise<T>;
}

type AnyMockHandler<T extends DefaultBodyType> =
  | MockHandler<T>
  | MockHandlerResolver<T>;

function isResolver<T extends DefaultBodyType>(
  h: AnyMockHandler<T>
): h is MockHandlerResolver<T> {
  return typeof h.response === "function";
}

export interface Request {
  headers: Headers;
  params: URLSearchParams;
}

export class MockWebServer {
  server: SetupServer;

  lastRequest?: Request;
  allRequests?: Request[] = [];

  constructor() {
    this.server = setupServer();

    this.server.events.on("request:start", (req) => {
      const request = this.mapRequest(req.request);

      this.lastRequest = request;
      this.allRequests?.push(request);
    });
  }

  start(): void {
    this.server.listen();
  }

  resetHandlers(): void {
    this.server.resetHandlers();
  }

  close(): void {
    this.server.close();
  }

  addRequestHandlers<T extends DefaultBodyType>(handlers: AnyMockHandler<T>[]) {
    const mwsHandlers = handlers.map((handler) =>
      this.createMwsHandler(handler)
    );
    this.server.use(...mwsHandlers);
  }

  addVerificationListener(assertion: (req: globalThis.Request) => void) {
    this.server.events.on("request:start", (req) => {
      const request = req.request;

      assertion(request);
    });
  }

  createMwsHandler<T extends DefaultBodyType>(handler: AnyMockHandler<T>) {
    const build = (method: Method) => {
      return http[method](
        handler.endpoint,
        async ({ request, params, cookies }) => {
          const data = isResolver(handler)
            ? await handler.response({ request, params, cookies })
            : handler.response;

          return HttpResponse.json(data, {
            status: handler.httpStatusCode,
          });
        }
      );
    };

    switch (handler.method) {
      case "get":
        return build("get");
      case "post":
        return build("post");
      case "put":
        return build("put");
    }
  }

  private mapRequest(req: globalThis.Request): Request {
    return {
      headers: req.headers,
      params: new URL(req.url).searchParams,
    };
  }
}
