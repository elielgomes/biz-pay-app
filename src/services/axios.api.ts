import axios from "axios";
import express from "express";
import *  as cookie from "cookie";
import { parseCookies } from "nookies";
import { NextPageContext, NextApiRequest } from "next";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const getAPIClient = (ctx?: Pick<NextPageContext, 'req'> | {
  req: NextApiRequest;
} | {
  req: express.Request;
} | null | undefined, options?: cookie.CookieParseOptions) => {

  const { "bizpay.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: "https://localhost:7156/api",
    httpsAgent,
  });

  if (token) {
    api.defaults.headers['authorization'] = `Bearer ${token}`;
  }
  return api;
}

//Em todas as req é colocado o token como header