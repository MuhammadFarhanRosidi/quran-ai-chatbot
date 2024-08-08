import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../config/axiosInstance";

export default function DetailCourse() {
  const [chapter, setChapter] = useState({});
  const { id } = useParams();
  async function showDetailCourse() {
    try {
      const { data } = await instance({
        url: `/detailCourse/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setChapter(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    showDetailCourse();
  }, []);
  return (
    <>
      <h1 className="text-center text-5xl pt-8">{chapter.nama}</h1>
      <p className="text-center mt-2">{chapter.arti}</p>
      <div className="card bg-base-100 w-4/5 shadow-xl mx-40">
        <div className="card-body shadow-lg shadow-green-500/50">
          {chapter.ayat.map((e) => {
            return (
              <div key={e.id} className="p-5 rounded-xl border ">
                <div dir="rtl" className="flex">
                  <button className="ml-4 w-12 h-12 text-white bg-green-600 rounded-2xl">
                    {e.nomor}
                  </button>
                  <h3 dir="rtl">{e.ar}</h3>
                </div>

                <p>{e.tr}</p>
                <p>{e.idn}</p>
              </div>
            );
          })}
          <div className="card-actions justify-end">
            <button className="btn btn-secondary">Like</button>
            <button className="btn btn-accent">Download</button>
          </div>
        </div>
      </div>
    </>
  );
}
