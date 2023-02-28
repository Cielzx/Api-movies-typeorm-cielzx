import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      Pages: {
        prevPage: string | null;
        nextPage: string | null;
        sorting: string | undefined;
        ordering: string | undefined;
        page: number;
        perPage: number;
      };
    }
  }
}
