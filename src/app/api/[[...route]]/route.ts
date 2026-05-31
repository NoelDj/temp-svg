import { Context, Hono } from "hono"
import { handle } from "hono/vercel"
import images from "./images"
import users from "./users"
import projects from "./projects";
import { AuthConfig, initAuthConfig } from "@hono/auth-js";
import authConfig from "@/auth.config"

export const runtime = "nodejs"

const app = new Hono().basePath("/api")


function getAuthConfig(c: Context): AuthConfig {
    return {
        secret: process.env.AUTH_SECRET,
        ...authConfig
    }
}

app.use('*', initAuthConfig(getAuthConfig))

const routes = app
  .route("/images", images) 
  .route("/users", users)
  .route("/projects", projects)


export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)


export type AppType = typeof routes