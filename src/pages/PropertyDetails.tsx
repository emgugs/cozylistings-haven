import React from "react";
import { useParams } from "react-router-dom";
import { Bath, Car, BedDouble, MapPin, Share2, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PropertyDetails = () => {
  const { id } = useParams();
  
  // This would normally come from an API call using the id
  const property = {
    id: 1,
    name: "6 Speculation Road",
    location: "Weir Views, Vic 3338",
    price: "$575,000",
    status: "Sold",
    soldDate: "20 Dec 2024",
    beds: 4,
    baths: 2,
    cars: 2,
    type: "House",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{property.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin size={18} />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Share2 size={24} />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Star size={24} />
            </button>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-4 gap-4 mb-8 rounded-xl overflow-hidden h-[500px]">
          <div className="col-span-2 row-span-2 relative">
            <img 
              src={property.images[0]} 
              alt="Main property view"
              className="w-full h-full object-cover"
            />
          </div>
          {property.images.slice(1).map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`Property view ${index + 2}`}
                className="w-full h-full object-cover"
              />
              {index === 2 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">+9</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">{property.status}</Badge>
                <span className="text-muted-foreground">
                  {property.status === "Sold" && `on ${property.soldDate}`}
                </span>
              </div>
              <div className="flex items-center gap-8 text-lg">
                <div className="flex items-center gap-2">
                  <BedDouble className="text-primary" />
                  <span>{property.beds} beds</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="text-primary" />
                  <span>{property.baths} baths</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="text-primary" />
                  <span>{property.cars} cars</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <div className="text-3xl font-bold text-primary mb-4">{property.price}</div>
            <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Contact Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;