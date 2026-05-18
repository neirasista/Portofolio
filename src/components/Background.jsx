import React from "react";

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      
      {/* SIMPLE BLOBS */}

      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl" />

      <div className="absolute top-0 right-0 w-72 h-72 bg-fuchsia-400/20 rounded-full blur-3xl hidden sm:block" />

      <div className="absolute bottom-0 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl" />

      {/* GRID */}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
    </div>
  );
};

export default AnimatedBackground;