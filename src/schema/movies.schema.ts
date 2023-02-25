import z from "zod";

const MovieSchema = z.object({
  name: z.string().max(50).min(3),
  description: z.string().optional().nullable(),
  duration: z.number(),
  price: z.number(),
});

const movieId = MovieSchema.extend({
  id: z.number(),
});

const movieUpdateSchema = MovieSchema.partial();

const returnAll = movieId.array();

const pagination = z.object({
  prevPage: z.string().nullable(),
  nextPage: z.string().nullable(),
  count: z.number(),
  data: returnAll,
});

export { MovieSchema, movieId, returnAll, movieUpdateSchema, pagination };
