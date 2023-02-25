import { Request, Response } from "express";
import { movie } from "../interface/movies.interface";
import createMovieService from "../services/createMovie.service";
import deleteMovie from "../services/deleteMovies.service";
import listMovies from "../services/listMovies.service";
import updateMovies from "../services/updateMovies.service";

const createMovies = async (req: Request, res: Response): Promise<Response> => {
  const movieData: movie = req.body;

  const newMovie = await createMovieService(movieData);

  return res.status(201).json(newMovie);
};

const listAllMovies = async (req: Request, res: Response) => {
  const getMovieData = await listMovies(req.query);

  return res.json(getMovieData);
};

const deleteMovies = async (req: Request, res: Response) => {
  const id = +req.params.id;

  await deleteMovie(id);

  return res.status(204).send();
};

const updateMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Data = req.body;
  const id = +req.params.id;

  const updateMovie = await updateMovies(Data, id);
  return res.json(updateMovie);
};

export { createMovies, listAllMovies, deleteMovies, updateMoviesController };
