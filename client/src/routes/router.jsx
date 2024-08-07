import { createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Courses from "../pages/Courses";
import MyCourses from "../pages/MyCourses";
import DetailCourse from "../pages/DetailCourse";
import EditCourse from "../pages/EditCourse";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // loader: () => {
    //   if (localStorage.access_token) {
    //     return redirect("/");
    //   }
    //   return null;
    // },
  },
]);

export default router;
