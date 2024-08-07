import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyCourses, removeCourse } from "../store/slices/coursesSlice";
import instance from "../config/axiosInstance";

export default function MyCourses() {
  const dispatch = useDispatch();
  const myCourses = useSelector((state) => state.courses.myCourses);
  const status = useSelector((state) => state.courses.status);
  const error = useSelector((state) => state.courses.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchMyCourses());
    }
  }, [status, dispatch]);

  const handleLeave = async (id) => {
    try {
      await instance({
        url: `/deleteMyCourse/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      dispatch(removeCourse(id));
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap gap-9 justify-center">
      {myCourses.map((e) => (
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
      ))}
    </div>
  );
}
