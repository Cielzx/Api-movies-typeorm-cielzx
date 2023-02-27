import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      Pages: {
        prevPage: string | null;
        nextPage: string | null;
        page: number;
        perPage: number;
      };
    }
  }
}
