import { Link } from "react-router-dom";

export function CourseNotFound() {
  return (
    <div className="min-h-screen bg-[#0c0c0c] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-display font-bold text-gray-100 mb-2">
          Course Not Found
        </h2>
        <Link to="/" className="text-accent text-sm hover:underline">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
