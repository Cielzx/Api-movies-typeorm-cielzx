import { Router } from "express";
import {
  createMovies,
  deleteMovies,
  listAllMovies,
  updateMoviesController,
} from "../controller/movies.controllers";
import EnsureDataIsValid from "../middlewares/ensureData.middleware";
import ensureMovieExist from "../middlewares/ensureMovieExist.middleaware";
import ensureNameIsEqual from "../middlewares/ensureName.middleware";
import { MovieSchema, movieUpdateSchema } from "../schema/movies.schema";

const movieRoutes: Router = Router();

movieRoutes.post(
  "",
  EnsureDataIsValid(MovieSchema),
  ensureNameIsEqual,
  createMovies
);
movieRoutes.get("", listAllMovies);
movieRoutes.delete("/:id", ensureMovieExist, deleteMovies);
movieRoutes.patch(
  "/:id",
  ensureMovieExist,
  ensureNameIsEqual,
  EnsureDataIsValid(movieUpdateSchema),
  updateMoviesController
);

export default movieRoutes;
