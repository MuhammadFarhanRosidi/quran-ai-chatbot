import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../config/axiosInstance";

export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [myDetailCourse, setMyDetailCourse] = useState({});
  async function handleShowMyCourse() {
    const { data } = await instance({
      url: "/my-courses",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    setMyCourses(data.Courses);
  }
  useEffect(() => {
    handleShowMyCourse();
  }, []);
  async function handleShowDetailCourse(id) {
    try {
      const { data } = await instance({
        url: `/detailCourse/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setMyDetailCourse(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  async function handleLeave(id) {
    const { data } = await instance({
      url: `/deleteMyCourse/${id}`,
      method: "Delete",
      headers: {
        Authorization: `Bearer ${localStorage.access_token}`,
      },
    });
    handleShowMyCourse(); // panggil lagi agar tanpa di refresh bisa hilang otomatis
  }
  return (
    <>
      <div className="flex flex-wrap gap-9">
        {myCourses.map((e) => {
          return (
            <div key={e.id} className="card bg-base-100 w-80 shadow-xl pt-5">
              <div key={e.chapterId} className="card-body">
                <h2 className="card-title">
                  {e.title} - {e.chapterId}
                </h2>
                <p>{e.description}</p>
                <div className="card-actions">
                  <button
                    onClick={() => {}}
                    className="btn bg-green-800 text-white"
                  >
                    See detail
                  </button>
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
