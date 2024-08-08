import axios from "axios";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  async function handleCredentialResponse({ credential }) {
    try {
      console.log("Encoded JWT ID token: " + credential);
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/google-login",
        data: {
          googleToken: credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      // localStorage.access_token = creadential;
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "287364404368-f49dj7sv08k07ld12oouc1u9u9n64q16.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("buttonDiv"),
      { theme: "outline", size: "large" } // customization attributes
    );
    google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Selamat datang di My <span className="text-green-600">Quran</span>
          </h1>
          <p className="py-6">Platform digital belajar Alquran</p>
          <div className="flex gap-5 justify-center">
            <Link to={"/register"} className="btn btn-primary">
              Sign Up
            </Link>
            <Link to={"/login"} className="btn btn-primary">
              Login
            </Link>
            <div id="buttonDiv"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
