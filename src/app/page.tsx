import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-6">
      
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-lg p-10">
        
        {/* Heading */}
        <div>
          <p className="text-sm text-gray-500 mb-3">
            system initialized
          </p>

          <h1 className="text-5xl font-bold text-gray-900">
            Welcome Hunter
          </h1>

          <p className="text-gray-600 mt-5 max-w-2xl text-lg leading-relaxed">
            Complete your daily tasks, gain experience,
            and level up step by step.
          </p>
        </div>

        <div className="mt-10">
          
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-all"
          >
            Arise
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;