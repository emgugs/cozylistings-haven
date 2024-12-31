import React from "react";
import { motion } from "framer-motion";
import { Bath, Car, BedDouble, MapPin } from "lucide-react";

interface PropertyCardProps {
  name: string;
  price: string;
  image: string;
  baths: number;
  beds: number;
  cars: number;
  address: string;
}

const PropertyCard = ({ name, price, image, baths, beds, cars, address }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg line-clamp-1">{name}</h3>
          <span className="text-primary font-bold">{price}</span>
        </div>

        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin size={16} />
          <span className="text-sm line-clamp-1">{address}</span>
        </div>
        
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
            <BedDouble size={18} />
            <span>{beds}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={18} />
            <span>{baths}</span>
          </div>
          <div className="flex items-center gap-1">
            <Car size={18} />
            <span>{cars}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;