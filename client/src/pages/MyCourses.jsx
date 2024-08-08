import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../config/axiosInstance";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  async function handleShowMyCourse() {
    try {
      const { data } = await instance({
        url: "/my-courses",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setMyCourses(data.Courses);
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  }
  useEffect(() => {
    handleShowMyCourse();
  }, []);
  async function handleLeave(id) {
    const { data } = await instance({
      url: `/deleteMyCourse/${id}`,
      method: "Delete",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    handleShowMyCourse();
  }
  return (
    <>
      <div className="flex flex-wrap gap-9 justify-center">
        {myCourses.map((e) => {
          return (
            <div key={e.id} className="card bg-base-100 w-80 shadow-xl pt-5">
              <div key={e.chapterId} className="card-body">
                <h2 className="card-title">
                  {e.title} - {e.chapterId}
                </h2>
                <p>{e.description}</p>
                <div className="card-actions">
                  <Link
                    to={`/detailCourse/${e.chapterId}`}
                    className="btn bg-green-800 text-white"
                  >
                    See detail
                  </Link>
                  <Link
                    to={`/editCourse/${e.id}`}
                    className="btn bg-cyan-400 text-white"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleLeave(e.id)}
                    className="btn bg-red-700 text-white"
                  >
                    Leave
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
