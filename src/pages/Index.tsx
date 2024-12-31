import React from "react";
import HeroSection from "@/components/HeroSection";
import SearchBar from "@/components/SearchBar";
import PropertyGrid from "@/components/PropertyGrid";

const Index = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <div className="relative z-10 -mt-8 mb-12 px-4">
        <SearchBar />
      </div>
      <PropertyGrid />
    </main>
  );
};

export default Index;