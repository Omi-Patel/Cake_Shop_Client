import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Header from "@/components/Header";
import {
  ChefHat,
  Heart,
  Phone,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full border border-slate-200">
                  <Sparkles className="h-4 w-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    Artisan Bakery Since 2008
                  </span>
                </div>

                <h1 className="text-5xl lg:text-6xl font-light leading-tight text-slate-900">
                  Where Every Cake
                  <br />
                  <span className="font-medium text-slate-700">
                    Tells a Story
                  </span>
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed max-w-lg font-light">
                  Handcrafted with passion and premium ingredients. Each
                  creation is a masterpiece designed to make your special
                  moments unforgettable.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-12 px-8 font-medium"
                >
                  Explore Collection
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg h-12 px-8 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Custom Order
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center shadow-sm"
                    >
                      <Users className="h-4 w-4 text-slate-600" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-amber-400 fill-current"
                      />
                    ))}
                    <span className="text-sm font-medium text-slate-700 ml-2">
                      4.9
                    </span>
                  </div>
                  <p className="text-sm text-slate-600">
                    <span className="font-medium text-slate-700">2,500+</span>{" "}
                    happy customers
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative bg-white p-6 rounded-2xl shadow-xl border border-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                    alt="Exquisite layered cake"
                    className="rounded-xl w-full h-[500px] object-cover"
                  />

                  {/* Floating Elements */}
                  <div className="absolute -top-3 -right-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-rose-500 fill-current" />
                      <span className="text-sm font-medium text-slate-700">
                        Made with Love
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-3 -left-3 bg-white rounded-xl p-3 shadow-lg border border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-amber-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium text-slate-700">
                        Premium Quality
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-xl p-2 shadow-lg border border-slate-100">
                    <ChefHat className="h-5 w-5 text-slate-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes Section */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge className="bg-slate-100 text-slate-700 mb-6 px-4 py-2 text-sm font-medium border border-slate-200">
              Our Signature Collection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Artisan Masterpieces
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Each cake is meticulously crafted with premium ingredients and
              innovative techniques to create unforgettable experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Chocolate Symphony",
                description:
                  "Rich Belgian chocolate layers with salted caramel ganache and edible gold leaf finish",
                price: "₹2,850",
                rating: 4.9,
                reviews: 156,
                image:
                  "https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                badge: "Best Seller",
                badgeColor:
                  "bg-emerald-100 text-emerald-700 border-emerald-200",
              },
              {
                title: "Strawberry Garden",
                description:
                  "Fresh strawberries, vanilla bean cream, and delicate rose petals with honey drizzle",
                price: "₹2,450",
                rating: 4.8,
                reviews: 89,
                image:
                  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                badge: "Seasonal",
                badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
              },
              {
                title: "Red Velvet Royale",
                description:
                  "Classic red velvet with cream cheese frosting and white chocolate curls",
                price: "₹2,650",
                rating: 4.9,
                reviews: 203,
                image:
                  "https://images.unsplash.com/photo-1562440499-64c9a111f713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
                badge: "Classic",
                badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
              },
            ].map((cake, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white rounded-2xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cake.image}
                    alt={cake.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Badge
                    className={`absolute top-4 left-4 ${cake.badgeColor} font-medium px-3 py-1 rounded-full border shadow-sm`}
                  >
                    {cake.badge}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-700 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-xl font-medium text-slate-900">
                      {cake.title}
                    </CardTitle>
                    <span className="text-lg font-semibold text-slate-900">
                      {cake.price}
                    </span>
                  </div>

                  <CardDescription className="text-slate-600 mb-4 line-clamp-2">
                    {cake.description}
                  </CardDescription>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(cake.rating)
                                ? "text-amber-400 fill-current"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-slate-600">
                        ({cake.reviews})
                      </span>
                    </div>

                    {/* <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg"
                    >
                      View Details
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button> */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/app/products">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg px-8 py-3 font-medium"
              >
                View All Cakes
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-light text-slate-900 mb-6">
              Why Choose Us
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              We're committed to delivering exceptional quality and
              unforgettable experiences with every creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Artisan Crafted",
                description:
                  "Each cake is handcrafted by our expert pastry chefs with years of experience.",
              },
              {
                icon: Shield,
                title: "Premium Quality",
                description:
                  "We use only the finest ingredients, sourced from trusted local suppliers.",
              },
              {
                icon: Truck,
                title: "Fresh Delivery",
                description:
                  "Your cake is delivered fresh and on time, ensuring perfect presentation.",
              },
              {
                icon: Heart,
                title: "Made with Love",
                description:
                  "Every creation is infused with passion and attention to detail.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-50 rounded-2xl mb-6 group-hover:bg-slate-100 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-slate-600" />
                </div>
                <h3 className="text-xl font-medium text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-light text-white mb-6">
              Ready to Create Something Special?
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
              Let us help you make your celebration unforgettable with a custom
              cake that's as unique as your special moment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/app/products">
                <Button
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-12 px-8 font-medium"
                >
                  Start Your Order
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link to="/app/contact-us">
                <Button
                  size="lg"
                  className="border-2 border-white/20 text-white hover:bg-white/10 rounded-lg h-12 px-8 font-medium"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
