import type * as trpc from "@trpc/server";
import type * as trpcNext from "@trpc/server/adapters/next";
import type { Session } from "next-auth";
import { getServerAuthSession } from "../common/gerServerAuthSession";
import { prisma } from "../db/client";

type CreateContextOptions = {
  session: Session | null;
};

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 **/

// inner context: define context which doesn't depend on the request (e.g. db connection)
// eslint-disable-next-line @typescript-eslint/require-await
export const createContextInner = async (opts: CreateContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (
  opts: trpcNext.CreateNextContextOptions
) => {
  const { req, res } = opts;
  // Get the session from the server using the getServerSesion wrapper function
  const session = await getServerAuthSession({ req, res });
  return await createContextInner({
    session,
  });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
