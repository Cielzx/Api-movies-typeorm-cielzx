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
  let page: number = Number(req.query.page) || 1;

  let perPage: number = Number(req.query.perPage) || 5;

  if (page <= 0 || page === undefined) {
    page = 1;
  }

  if (perPage <= 0 || perPage === undefined || perPage >= 5) {
    perPage = 5;
  }

  const baseUrl: string = `http://localhost:3000/movies`;

  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;
  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;

  if (page <= 1) {
    prevPage = null;
  }

  req.Pages = {
    prevPage: prevPage,
    nextPage: nextPage,
    page: page,
    perPage: perPage,
  };

  const getMovieData = await listMovies(req);

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
