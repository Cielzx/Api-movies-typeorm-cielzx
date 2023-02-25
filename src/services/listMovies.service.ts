import { count } from "console";
import { Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  movie,
  movieRequest,
  movieReturnAll,
  page,
} from "../interface/movies.interface";
import { movieId, returnAll } from "../schema/movies.schema";

const listMovies = async (payload: any): Promise<page> => {
  const moviesRepos: Repository<Movie> = AppDataSource.getRepository(Movie);

  let page: number = Number(payload.page) || 1;

  let perPage: number = Number(payload.perPage) || 5;

  if (page <= 0 || page === undefined) {
    page = 1;
  }

  if (perPage <= 0 || page === undefined || perPage >= 5) {
    perPage = 5;
  }

  let ordering: string = payload.order;

  let sorting: string = payload.sort || "id";

  if (ordering === undefined) {
    ordering = "ASC";
  }

  const baseUrl: string = `localhost:3000/movies/`;

  let prevPage: string | null = `${baseUrl}?page=${
    page - 1
  }&perPage=${perPage}`;
  let nextPage: string | null = `${baseUrl}?page=${
    page + 1
  }&perPage=${perPage}`;

  if (page <= 1) {
    prevPage = null;
  }

  if (page >= 5) {
    nextPage = null;
  }

  console.log(sorting);

  const getAllmovies: movieReturnAll = await moviesRepos.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [sorting]: ordering,
    },
  });

  const findAllMovies = returnAll.parse(getAllmovies);

  const count = (await moviesRepos.find()).length;

  const pagination: page = {
    prevPage,
    nextPage,
    count,
    data: findAllMovies,
  };

  return pagination;
};

export default listMovies;
