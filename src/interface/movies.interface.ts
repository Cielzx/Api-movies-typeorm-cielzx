import { QueryResult } from "pg";
import { DeepPartial, Repository } from "typeorm";
import z from "zod";
import { Movie } from "../entities";
import {
  MovieSchema,
  movieId,
  returnAll,
  movieUpdateSchema,
  pagination,
} from "../schema/movies.schema";

type movieRequest = z.infer<typeof MovieSchema>;

type movie = z.infer<typeof movieId>;

type movieUpd = z.infer<typeof movieUpdateSchema>;

type movieResult = QueryResult<movie>;

type movieUpdated = DeepPartial<movieRequest>;

type movieReturnAll = z.infer<typeof returnAll>;

type page = z.infer<typeof pagination>;

interface iPage {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: movieReturnAll;
}

export {
  movie,
  movieRequest,
  movieResult,
  movieReturnAll,
  movieUpdated,
  movieUpd,
  page,
};
