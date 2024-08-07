import { useEffect, useState } from "react";
import instance from "../config/axiosInstance";
import Card from "../components/Card";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  async function showCourses() {
    try {
      const { data } = await instance({
        url: "/courses",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.access_token}`,
        },
      });
      setCourses(data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  useEffect(() => {
    showCourses();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-9">
        {courses.map((e) => (
          <Card key={e.nomor} courses={e} />
        ))}
      </div>
    </div>
  );
}
