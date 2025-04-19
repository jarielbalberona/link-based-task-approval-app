import { Router } from "express";
import { authenticationRouter } from "@/app/authentication/authentication.routes";
import { userRouter } from "@/app/user/user.routes";
import { taskRouter } from "@/app/task/task.routes";

import { csrfRouter } from "@/routes/csrf.route";

interface RouteConfig {
  path: string;
  router: Router;
}

const healthRouter = Router();
healthRouter.get("/", (req, res) => {
  res.status(200).send("ok");
});

export const routes: RouteConfig[] = [
  { path: "/health", router: healthRouter },
  { path: "/auth", router: authenticationRouter },
  { path: "/users", router: userRouter },
  { path: "/csrf-token", router: csrfRouter },
  { path: "/tasks", router: taskRouter },
];
