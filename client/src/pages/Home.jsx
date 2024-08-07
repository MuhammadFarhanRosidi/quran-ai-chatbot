import { Link } from "react-router-dom";

export default function Home() {
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
          </div>
        </div>
      </div>
    </div>
  );
}
