import React from "react";
import PropertyCard from "./PropertyCard";

const properties = [
  {
    id: 1,
    name: "Modern Villa with Pool",
    price: "$1,250,000",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
    baths: 3,
    beds: 4,
    cars: 2,
  },
  {
    id: 2,
    name: "Luxury Penthouse",
    price: "$2,500,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
    baths: 4,
    beds: 5,
    cars: 3,
  },
  {
    id: 3,
    name: "Cozy Downtown Apartment",
    price: "$750,000",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2670&auto=format&fit=crop",
    baths: 2,
    beds: 3,
    cars: 1,
  },
  {
    id: 4,
    name: "Seaside Retreat",
    price: "$1,850,000",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
    baths: 3,
    beds: 4,
    cars: 2,
  },
  {
    id: 5,
    name: "Urban Loft",
    price: "$950,000",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
    baths: 2,
    beds: 2,
    cars: 1,
  },
  {
    id: 6,
    name: "Garden Estate",
    price: "$3,200,000",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    baths: 5,
    beds: 6,
    cars: 4,
  },
];

const PropertyGrid = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </div>
  );
};

export default PropertyGrid;