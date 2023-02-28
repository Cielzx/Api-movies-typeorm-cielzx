import { DeepPartial, Repository } from "typeorm";
import { z } from "zod";
import { Movie } from "../../entities";
import { movieId } from "../../schema/movies.schema";

type iMovieCreate = z.infer<typeof movieId>;
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;

export { iMovieCreate, iMovieUpdate, iMovieRepo };
