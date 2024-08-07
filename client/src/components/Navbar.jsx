import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  async function handlerLogout() {
    try {
      localStorage.clear();
      navigate("/home");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="bg-zinc-900 flex justify-between h-14">
      <div>
        <Link to={"/"} className="btn btn-ghost text-xl text-white">
          My<span className="text-green-600">Quran</span>
        </Link>
      </div>
      <div>
        <Link to={"/myCourses"} className="btn btn-ghost text-xl text-white">
          My Courses
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <button className="text-white bg-red-700" onClick={handlerLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
