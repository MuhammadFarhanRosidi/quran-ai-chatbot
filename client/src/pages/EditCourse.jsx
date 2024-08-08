import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../config/axiosInstance";

export default function EditCourse() {
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id, "<<<<id params");

  async function showMyDescriptionCourse() {
    try {
      const { data } = await instance({
        url: `/editMyCourse/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      console.log(data.description, "<<<<<<<<<<");
      setDescription(data.description);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    showMyDescriptionCourse();
  }, []);

  async function editMyDescriptionCourse(event) {
    event.preventDefault(); // Mencegah perilaku default form submission
    try {
      const { data } = await instance({
        url: `/editMyCourse/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
        data: {
          description,
        },
      });
      navigate("/myCourses");
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  return (
    <div className="mx-auto block rounded-lg bg-white p-6 text-center shadow-4 dark:bg-surface-dark">
      <form onSubmit={editMyDescriptionCourse}>
        {/*Message textarea*/}
        <div
          className="flex justify-center relative"
          data-twe-input-wrapper-init=""
        >
          <textarea
            className="peer block min-h-[auto] w-[90%] rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
            id="exampleFormControlTextarea13"
            rows={3}
            value={description} // Menggunakan value untuk sinkronisasi state
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="inline-block w-[90%] rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          data-twe-ripple-init=""
          data-twe-ripple-color="light"
        >
          Send
        </button>
      </form>
    </div>
  );
}
