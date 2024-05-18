import Admin from "../pages/Admin";
import Layout from "../pages/Admin/layout";
import Response from "../pages/Admin/pages/response";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registration from "../pages/Registration";

export const publicRouter = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login,
    layout: null
  },
  {
    path: "/register",
    component: Registration,
    layout: null
  },
  {
    path: "/admin",
    component: Admin,
    layout: Layout
  },
  {
    path: "/admin/response",
    component: Response,
    layout: Layout
  },
  {
    path: "/chats/:id",
    component: Home
  }
];
