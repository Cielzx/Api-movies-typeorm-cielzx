import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { movieReturnAll, page } from "../interface/movies.interface";
import { movieId, returnAll } from "../schema/movies.schema";

const listMovies = async (payload: any): Promise<page> => {
  const moviesRepos: Repository<Movie> = AppDataSource.getRepository(Movie);

  let perPage = Number(payload.Pages.perPage);

  let page = Number(payload.Pages.page);

  let ordering = payload.Pages.ordering || "asc";

  let sorting = payload.Pages.sorting || "id";

  let prevPage = payload.Pages.prevPage;
  let nextPage = payload.Pages.nextPage;

  const getAllmovies: movieReturnAll = await moviesRepos.find({
    take: perPage,
    skip: perPage * (page - 1),
    order: {
      [sorting]: ordering,
    },
  });

  const findAllMovies = returnAll.parse(getAllmovies);

  if (
    page >= 5 ||
    findAllMovies.length <= 0 ||
    (page === 3 && findAllMovies.length === 1)
  ) {
    nextPage = null;
  }

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
