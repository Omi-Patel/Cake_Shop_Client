import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">
              Welcome to Cack Shop
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Delicious cakes made with love and passion
            </p>
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Cakes Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Featured Cakes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Chocolate Dream",
                description: "Rich chocolate layers with ganache",
                price: "$45",
              },
              {
                title: "Strawberry Delight",
                description: "Fresh strawberries with vanilla cream",
                price: "$40",
              },
              {
                title: "Red Velvet Classic",
                description: "Traditional red velvet with cream cheese",
                price: "$42",
              },
            ].map((cake, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{cake.title}</CardTitle>
                  <CardDescription>{cake.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-pink-500">
                    {cake.price}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-pink-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Custom Cakes for Every Occasion
          </h2>
          <p className="text-gray-600 mb-8">
            Let us make your special day even sweeter with our custom cake
            designs
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
          >
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
