import { t } from "../trpc";
import { visitorCommentsRouter } from "./visitorComments";

export const appRouter = t.router({
  visitor: visitorCommentsRouter,
});

// type defenition of the API
export type AppRouter = typeof appRouter;
