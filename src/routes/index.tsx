import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import {
  Award,
  Cake,
  ChefHat,
  Clock,
  Heart,
  Phone,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="relative py-16 pt-32 sm:pt-44 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-orange-50 via-pink-50 to-amber-50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                <Award className="h-4 w-4 text-orange-500" />
                <span className="text-sm font-medium text-orange-700">Award Winning Bakery</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="text-gray-800">Delight in Every</span>
                <span className="block mt-1 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">Sweet Creation</span>
              </h1>
              
              <p className="text-gray-600 max-w-md">
                Experience artisanal cakes crafted with premium ingredients and artistic passion. 
                Each creation tells a unique story.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl transition-all">
                  <Cake className="h-4 w-4 mr-2" />
                  View Menu
                </Button>
                <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                  <Phone className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center">
                      <Users className="h-4 w-4 text-orange-500" />
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-semibold text-orange-600">500+</span> happy customers
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:w-1/2 relative">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-200 to-pink-200 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-xl">
                  <img
                    src="https://i.pinimg.com/originals/bc/3e/f0/bc3ef0c14dc78e0a2a957a240a7de33b.jpg"
                    alt="Beautiful layered cake"
                    className="rounded-xl w-full h-[400px] object-cover"
                  />
                  <div className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg">
                    <Heart className="h-5 w-5 text-pink-500 fill-current" />
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">4.9/5 Rating</span>
                  </div>
                </div>
                
                <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white rounded-lg p-2 shadow-lg">
                  <ChefHat className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="bg-orange-100 text-orange-700 mb-4">
              Our Specialties
            </Badge>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Signature Cake Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most beloved creations, each crafted with premium
              ingredients and artistic flair
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Chocolate Symphony",
                description:
                  "Rich Belgian chocolate layers with salted caramel and gold leaf finish",
                price: "$65",
                rating: 4.9,
                image:
                  "https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4087-feature-2.jpg",
                badge: "Best Seller",
              },
              {
                title: "Strawberry Garden",
                description:
                  "Fresh strawberries, vanilla bean cream, and delicate rose petals",
                price: "$55",
                rating: 4.8,
                image:
                  "https://amycakesbakes.com/wp-content/uploads/2021/07/Fresh-Strawberry-Cake-by-Amycakes-Bakes.jpg",
                badge: "Seasonal",
              },
              {
                title: "Red Velvet Royale",
                description:
                  "Classic red velvet with cream cheese frosting and white chocolate curls",
                price: "$60",
                rating: 4.9,
                image:
                  "https://tse2.mm.bing.net/th?id=OIP.udBr42Cpf-ZBjzeJEzYGVgHaFr&pid=Api&P=0&h=180",
                badge: "Classic",
              },
            ].map((cake, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={cake.image || "/placeholder.svg"}
                    alt={cake.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-4 left-4 bg-orange-500 text-white">
                    {cake.badge}
                  </Badge>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="h-4 w-4 text-gray-600 hover:text-pink-500 cursor-pointer transition-colors" />
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">
                      {cake.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {cake.rating}
                      </span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {cake.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent">
                      {cake.price}
                    </span>
                    <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-300 text-orange-700 hover:bg-orange-50"
            >
              View All Cakes
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-orange-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Sweet Dreams Bakery?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're not just a bakery, we're creators of sweet memories and
              moments of joy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Master Bakers",
                description:
                  "Our skilled artisans bring decades of experience to every creation",
              },
              {
                icon: Clock,
                title: "Fresh Daily",
                description:
                  "All cakes are baked fresh daily using the finest ingredients",
              },
              {
                icon: Heart,
                title: "Made with Love",
                description:
                  "Every cake is crafted with passion and attention to detail",
              },
              {
                icon: Award,
                title: "Award Winning",
                description:
                  "Recognized for excellence in taste, quality, and presentation",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                  <feature.icon className="h-8 w-8 text-orange-500 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our happy customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Wedding Client",
                content:
                  "The wedding cake was absolutely stunning! Not only did it look amazing, but it tasted even better. Our guests are still talking about it!",
                rating: 5,
              },
              {
                name: "Mike Chen",
                role: "Birthday Party",
                content:
                  "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible!",
                rating: 5,
              },
              {
                name: "Emily Davis",
                role: "Corporate Event",
                content:
                  "Professional service and delicious cakes for our company event. Will definitely be ordering again!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-400 rounded-full p-2 mr-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Create Sweet Memories?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let us make your special occasion even sweeter with our custom cake
            designs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-orange-600 hover:bg-gray-100"
            >
              <Cake className="h-5 w-5 mr-2" />
              Order Custom Cake
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Us Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
