import { Repository } from "typeorm";
import app from "../app";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const deleteMovie = async (id: number): Promise<void> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = await movieRepo.findOne({
    where: {
      id: id,
    },
  });

  await movieRepo.remove(movie!);
};

export default deleteMovie;
