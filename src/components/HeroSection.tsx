import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center space-y-6"
        >
          <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full w-fit">
            Discover Your Dream Home
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find Your Perfect Place to Live
          </h1>
          <p className="text-muted-foreground text-lg max-w-[500px]">
            We help you find the perfect property that matches your lifestyle and
            preferences.
          </p>
          <div className="flex gap-8 mt-8">
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">2,500+</h3>
              <p className="text-muted-foreground">Properties Sold</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-bold">1,800+</h3>
              <p className="text-muted-foreground">Properties Leased</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="https://cdn.coverr.co/videos/coverr-modern-house-interior-2741/1080p.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;