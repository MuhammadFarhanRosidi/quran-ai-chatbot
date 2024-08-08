import { useEffect, useState } from "react";
import instance from "../config/axiosInstance";
import Card from "../components/Card";

export default function Courses() {
  const [chapters, setChapters] = useState([]);
  async function showCourses() {
    try {
      const { data } = await instance({
        url: "/courses",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setChapters(data.chapters);
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  }
  useEffect(() => {
    showCourses();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-9">
        {chapters.map((e) => (
          <Card key={e.number} chapters={e} />
        ))}
      </div>
    </div>
  );
}
