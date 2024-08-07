import { useNavigate } from "react-router-dom";
import instance from "../config/axiosInstance";

export default function Card({ courses }) {
  const navigte = useNavigate();
  async function handlerJoin(id) {
    try {
      const { data } = await instance({
        url: `/joinCourse/${id}`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      navigte("/myCourses");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="card bg-base-100 w-80 shadow-xl pt-5">
      <div className="card-body">
        <h2 className="card-title">
          {courses.nama_latin} - ({courses.nomor})
        </h2>
        <p>{courses.arti}</p>
        <div className="card-actions">
          <button
            onClick={() => handlerJoin(courses.nomor)}
            className="btn bg-green-800 text-white"
          >
            Add to my course
          </button>
        </div>
      </div>
    </div>
  );
}
