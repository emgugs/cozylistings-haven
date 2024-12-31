import React from "react";
import { useParams } from "react-router-dom";
import { Bath, Car, BedDouble, MapPin, Share2, Star, Phone, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    description: `
      This stunning family home offers the perfect blend of comfort and style. Featuring:
      
      • Spacious open-plan living and dining areas
      • Modern kitchen with stone benchtops and stainless steel appliances
      • Master bedroom with walk-in robe and ensuite
      • Three additional bedrooms with built-in robes
      • Large outdoor entertainment area
      • Beautifully landscaped gardens
      • Double garage with internal access
      • Close to schools, shops, and public transport
      
      Don't miss this opportunity to secure your dream home in a highly sought-after location.
    `,
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2675&auto=format&fit=crop",
    ],
    agents: [
      {
        id: 1,
        name: "Sarah Johnson",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2670&auto=format&fit=crop",
        phone: "0400 000 000",
        email: "sarah.j@realestate.com",
        role: "Senior Property Consultant"
      },
      {
        id: 2,
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
        phone: "0400 111 111",
        email: "michael.c@realestate.com",
        role: "Property Manager"
      }
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

        {/* Property Details and Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {/* Property Stats */}
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

            {/* Property Description */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Property Description</h2>
              <div className="prose max-w-none">
                {property.description.split('\n').map((line, index) => (
                  <p key={index} className="mb-4 whitespace-pre-line">{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Price and Agents */}
          <div className="space-y-6">
            {/* Price Card */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-primary mb-4">{property.price}</div>
              <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Contact Agent
              </button>
            </div>

            {/* Agent Cards */}
            {property.agents.map((agent) => (
              <Card key={agent.id} className="bg-white">
                <CardHeader className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={agent.image} alt={agent.name} />
                      <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{agent.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone size={16} className="text-primary" />
                    <span>{agent.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail size={16} className="text-primary" />
                    <span>{agent.email}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;