import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import MainLayout from "../pages/MainLayout";
import Courses from "../pages/Courses";
import MyCourses from "../pages/MyCourses";
import DetailCourse from "../pages/DetailCourse";
import EditCourse from "../pages/EditCourse";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Register />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        return redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }
      return null;
    },
    children: [
      {
        path: "",
        element: <Courses />,
      },
      {
        path: "myCourses",
        element: <MyCourses />,
      },
      {
        path: "detailCourse/:id",
        element: <DetailCourse />,
      },
      {
        path: "editCourse/:id",
        element: <EditCourse />,
      },
    ],
  },
]);

export default router;
