// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import instance from "../config/axiosInstance";

// export default function DetailCourse() {
//   const [chapter, setChapter] = useState({});
//   const { id } = useParams();
//   async function showDetailCourse() {
//     try {
//       const { data } = await instance({
//         url: `/detailCourse/${id}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });
//       setChapter(data);
//     } catch (error) {
//       console.log(error.response.data.message);
//     }
//   }
//   useEffect(() => {
//     showDetailCourse();
//   }, []);
//   return (
//     <>
//       <h1 className="text-center text-5xl pt-8">{chapter.nama}</h1>
//       <p className="text-center mt-2">{chapter.arti}</p>
//       <p className="text-center mt-2">{chapter.audio}</p>
//       <div className="card bg-base-100 w-4/5 shadow-xl mx-40">
//         <div className="card-body shadow-lg shadow-green-500/50">
//           <audio controls="">
//             <source src={chapter.audio} type="audio/mp3" />
//             Your browser does not support the audio element.
//           </audio>
//           {/* {JSON.stringify(chapter.ayat[0].tr)} */}
//           {/* {JSON.stringify(chapter)} */}
//           {chapter.ayat?.map((e) => {
//             return (
//               <div key={e.id} className="p-5 rounded-xl border ">
//                 <button className="ml-4 w-12 h-12 text-white bg-green-600 rounded-2xl">
//                   {e.nomor}
//                 </button>
//                 <h3 dir="rtl">{e.ar}</h3>
//                 <p>{e.idn}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import instance from "../config/axiosInstance";

// export default function DetailCourse() {
//   const [chapter, setChapter] = useState({});
//   const { id } = useParams();

//   async function showDetailCourse() {
//     try {
//       const { data } = await instance({
//         url: `/detailCourse/${id}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });
//       console.log(data);
//       setChapter(data.data); // Menyesuaikan dengan struktur data yang diterima dari API
//     } catch (error) {
//       console.log(error.response?.data?.message || error.message);
//     }
//   }

//   useEffect(() => {
//     showDetailCourse();
//   }, [id]);

//   return (
//     <>
//       <h1 className="text-center text-5xl pt-8">{chapter.name?.long}</h1>
//       <p className="text-center mt-2">{chapter.name?.translation?.id}</p>
//       <div className="card bg-base-100 w-4/5 shadow-xl mx-40">
//         {JSON.stringify(chapter)}
//         <div className="card-body shadow-lg shadow-green-500/50">
//           <audio controls>
//             <source
//               src={chapter.verses?.[0]?.audio?.primary}
//               type="audio/mp3"
//             />
//             Your browser does not support the audio element.
//           </audio>
//           {chapter.verses?.map((verse) => (
//             <div key={verse.number.inQuran} className="p-5 rounded-xl border">
//               <button className="ml-4 w-12 h-12 text-white bg-green-600 rounded-2xl">
//                 {verse.number.inSurah}
//               </button>
//               <h3 dir="rtl">{verse.text.arab}</h3>
//               <p>{verse.translation.id}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import instance from "../config/axiosInstance";

// export default function DetailCourse() {
//   const [chapter, setChapter] = useState({});
//   const { id } = useParams();

//   async function showDetailCourse() {
//     try {
//       const { data } = await instance({
//         url: `/detailCourse/${id}`,
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.access_token}`,
//         },
//       });
//       setChapter(data.data); // Menyesuaikan dengan struktur data yang diterima dari API
//     } catch (error) {
//       console.log(error.response?.data?.message || error.message);
//     }
//   }

//   useEffect(() => {
//     showDetailCourse();
//   }, [id]);

//   return (
//     <>
//       <h1 className="text-center text-5xl pt-8">{chapter.name?.long}</h1>
//       <p className="text-center mt-2">{chapter.name?.translation?.id}</p>
//       <div className="card bg-base-100 w-4/5 shadow-xl mx-40">
//         <div className="card-body shadow-lg shadow-green-500/50">
//           {chapter.verses?.map((verse) => (
//             <div
//               key={verse.number.inQuran}
//               className="p-5 rounded-xl border mb-4"
//             >
//               <button className="ml-4 w-12 h-12 text-white bg-green-600 rounded-2xl">
//                 {verse.number.inSurah}
//               </button>
//               <h3 dir="rtl">{verse.text.arab}</h3>
//               <p>{verse.translation.id}</p>
//               <audio controls className="mt-2">
//                 <source src={verse.audio.primary} type="audio/mp3" />
//                 Your browser does not support the audio element.
//               </audio>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      setChapter(data.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    showDetailCourse();
  }, [id]);

  return (
    <>
      <h1 className="text-center text-5xl pt-8">{chapter.name?.long}</h1>
      <p className="text-center mt-2">{chapter.name?.translation?.id}</p>
      <div className="card bg-base-100 w-4/5 shadow-xl mx-40">
        <div className="card-body shadow-lg shadow-green-500/50">
          {chapter.verses?.map((verse) => (
            <div
              key={verse.number.inQuran}
              className="p-5 rounded-xl border mb-4"
            >
              <div className="flex items-center">
                <button className="w-12 h-12 text-white bg-green-600 rounded-2xl">
                  {verse.number.inSurah}
                </button>
                <h3 dir="rtl" className="text-3xl ml-4 flex-grow">
                  {verse.text.arab}
                </h3>
              </div>
              <p className="mt-2">{verse.translation.id}</p>
              <audio controls className="mt-2">
                <source src={verse.audio.primary} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
