import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  movie,
  movieRequest,
  movieReturnAll,
  moviUpdated,
} from "../interface/movies.interface";
import { movieId, MovieSchema, returnAll } from "../schema/movies.schema";

const updateMovies = async (
  Data: moviUpdated,
  id: number
): Promise<movieRequest> => {
  const moviesRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldData = await moviesRepo.findOneBy({
    id: id,
  });

  const movie = moviesRepo.create({
    ...oldData,
    ...Data,
  });

  await moviesRepo.save(movie);

  const updateMovie = movieId.parse(movie);

  return updateMovie;
};

export default updateMovies;
