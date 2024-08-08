// import { useEffect, useState } from "react";
// import instance from "../config/axiosInstance";
// import Card from "../components/Card";

// export default function Courses() {
//   const [chapters, setChapters] = useState([]);
//   async function showCourses() {
//     try {
//       const { data } = await instance({
//         url: "/courses",
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });
//       setChapters(data.chapters);
//     } catch (error) {
//       console.log(error.response ? error.response.data.message : error.message);
//     }
//   }
//   useEffect(() => {
//     showCourses();
//   }, []);
//   return (
//     <div>
//       <div className="flex flex-wrap justify-center gap-9">
//         {chapters.map((e) => (
//           <Card key={e.number} chapters={e} />
//         ))}
//       </div>
//     </div>
//   );
// }

// //!
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../store/slices/chaptersSlice";
import Card from "../components/Card";

export default function Courses() {
  const dispatch = useDispatch();
  const { chapters, loading, error } = useSelector((state) => state.chapters);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
