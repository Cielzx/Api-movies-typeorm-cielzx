import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { appError } from "../errors";

const ensureMovieExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie = await movieRepo.findOne({
    where: {
      id: +req.params.id,
    },
  });

  if (!findMovie) {
    throw new appError("Movie not found", 404);
  }

  return next();
};

export default ensureMovieExist;
