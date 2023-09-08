import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-10 bg-slate-300">
      <h1 className="text-green font-primary font-bold text-4xl">
        Welcome to GitHub Issue Management
      </h1>
      <Link to="/issue">
        <div className="bg-green text-white px-10 py-4  text-3xl cursor-pointer relative before:absolute before:top-[-10px] before:left-[-10px] before:border-4 before:border-black before:bg-transparent before:w-[calc(100%_+_2px)] before:h-[calc(100%_+_2px)]">
          Login With GitHub
        </div>
      </Link>
    </div>
  );
}
