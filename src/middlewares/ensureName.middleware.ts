import { Request, Response, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { appError } from "../errors";

const ensureNameIsEqual = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovieName = await movieRepo.findOneBy({
    name: req.body.name,
  });

  if (findMovieName) {
    throw new appError("Movie already exists.", 409);
  }

  return next();
};

export default ensureNameIsEqual;
