import { z } from "zod";
import { t, authProcedure } from "../trpc";

export const visitorCommentsRouter = t.router({
  getAllComments: authProcedure.query(async ({ ctx }) => {
    try {
      const comments = await ctx.prisma.message.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
      return comments;
    } catch (error) {
      console.log(error);
    }
  }),
  addComments: authProcedure
    .input(
      z.object({
        text: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.message.create({
          data: {
            authorName: ctx?.session?.user?.name as string,
            text: input.text,
            authorId: ctx?.session?.user?.id,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
