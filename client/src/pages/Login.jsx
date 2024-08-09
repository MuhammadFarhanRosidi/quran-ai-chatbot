import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../config/axiosInstance";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  if (!email) {
    toast.error("Email is required");
  }
  if (!password) {
    toast.error("Password is required");
  }
  async function handlerLogin(e) {
    try {
      e.preventDefault();
      const { data } = await instance({
        url: "/login",
        method: "POST",
        data: {
          email,
          password,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      toast.success("Login Success");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  }
  async function handleCredentialResponse({ credential }) {
    try {
      // console.log("Encoded JWT ID token: " + credential);
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/google-login",
        data: {
          googleToken: credential,
        },
      });
      localStorage.setItem("access_token", data.access_token);
      toast.success("Login Success");
      toast.success("We have send email for you");
      navigate("/");
    } catch (error) {
      toast.error("Login Failed");
      toast.error(error.response.data.message);
      console.log(error);
    }
  }
  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "287364404368-f49dj7sv08k07ld12oouc1u9u9n64q16.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("buttonDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handlerLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <div id="buttonDiv"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
