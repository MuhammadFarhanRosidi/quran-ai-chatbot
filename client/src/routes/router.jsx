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
        redirect("/");
      }
      return null;
    },
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if (localStorage.access_token) {
        redirect("/");
      }
      return null;
    },
  },
  {
    path: "/",
    element: <MainLayout />,
    // loader: () => {
    //   if (!localStorage.access_token) {
    //     redirect("/login");
    //   }
    //   return null;
    // },
    children: [
      {
        path: "",
        element: <Courses />,
        // loader: () => {
        //   if (!localStorage.access_token) {
        //   }
        //   redirect("/login");
        // },
      },
      {
        path: "myCourses",
        element: <MyCourses />,
        // loader: () => {
        //   if (!localStorage.access_token) {
        //   }
        //   redirect("/login");
        // },
      },
      {
        path: "detailCourse",
        element: <DetailCourse />,
        // loader: () => {
        //   if (!localStorage.access_token) {
        //   }
        //   redirect("/login");
        // },
      },
      {
        path: "editCourse",
        element: <EditCourse />,
        // loader: () => {
        //   if (!localStorage.access_token) {
        //   }
        //   redirect("/login");
        // },
      },
    ],
  },
]);

export default router;
