import { movie, movieRequest } from "../interface/movies.interface";
import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { movieId, MovieSchema } from "../schema/movies.schema";

const createMovieService = async (Data: movieRequest): Promise<movie> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = movieRepository.create(Data);

  await movieRepository.save(movie);

  const newMovie = movieId.parse(movie);

  return newMovie;
};

export default createMovieService;
