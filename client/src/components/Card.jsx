import { useNavigate } from "react-router-dom";
import instance from "../config/axiosInstance";
import { toast } from "react-toastify";

export default function Card({ chapters }) {
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
      toast.success("Join Success");
      navigte("/myCourses");
    } catch (error) {
      toast.error("Join Failed");
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }
  return (
    <div className="card bg-base-100 w-80 shadow-xl pt-5">
      <div className="card-body">
        <h2 className="card-title">
          {chapters.name.arab} - ({chapters.number})
        </h2>
        <p>{chapters.name.translation}</p>
        <div className="card-actions">
          <button
            onClick={() => handlerJoin(chapters.number)}
            className="btn bg-green-800 text-white"
          >
            Add to my course
          </button>
        </div>
      </div>
    </div>
  );
}
