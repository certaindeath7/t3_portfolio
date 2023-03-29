import { createNextApiHandler } from "@trpc/server/adapters/next";

import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/api/context";
import { appRouter } from "../../../server/api/routers/root";
import type { NextApiRequest, NextApiResponse } from "next";

const nextApiHandler = createNextApiHandler({
  router: appRouter,
  createContext: createContext, //cerateContext function runs everytime a request comes in
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
// export API handler
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return nextApiHandler(req, res);
}
