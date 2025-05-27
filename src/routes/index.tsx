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
  ArrowRight,
  Sparkles,
  Shield,
  Truck,
  Gift,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-orange-200/20 to-amber-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-amber-200">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-amber-700">
                    Award Winning Artisan Bakery
                  </span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-gray-900">Crafting</span>
                  <br />
                  <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                    Sweet Dreams
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Where artistry meets flavor. Each creation is a masterpiece,
                  handcrafted with premium ingredients and boundless passion.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl h-14 px-8"
                >
                  <Cake className="h-5 w-5 mr-2" />
                  Explore Our Cakes
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-200 text-amber-700 hover:bg-amber-50 rounded-2xl h-14 px-8"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Order Custom Cake
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-full border-3 border-white bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg"
                    >
                      <Users className="h-5 w-5 text-white" />
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
                    <span className="text-sm font-semibold text-gray-700 ml-2">
                      4.9/5
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-amber-600">2,500+</span>{" "}
                    happy customers
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="relative">
              <div className="relative">
                {/* Main Image Container */}
                <div className="relative bg-white/80 backdrop-blur-sm p-4 rounded-3xl shadow-2xl border border-white/50">
                  <img
                    src="https://i.pinimg.com/originals/bc/3e/f0/bc3ef0c14dc78e0a2a957a240a7de33b.jpg"
                    alt="Exquisite layered cake"
                    className="rounded-2xl w-full h-[500px] object-cover"
                  />

                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-amber-100">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-rose-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">
                        Made with Love
                      </span>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-amber-100">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-amber-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-semibold text-gray-700">
                        Premium Quality
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-xl border border-amber-100">
                    <ChefHat className="h-6 w-6 text-amber-500" />
                  </div>
                </div>

                {/* Background Decoration */}
                <div className="absolute -inset-6 bg-gradient-to-br from-amber-200/20 to-orange-300/20 rounded-3xl -z-10 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cakes Section */}
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 mb-6 px-4 py-2 text-sm font-semibold">
              Our Signature Collection
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Artisan Cake Masterpieces
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Each cake is a work of art, meticulously crafted with premium
              ingredients and innovative techniques to create unforgettable
              experiences.
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
                  "https://scientificallysweet.com/wp-content/uploads/2020/09/IMG_4087-feature-2.jpg",
                badge: "Best Seller",
                badgeColor: "from-emerald-500 to-green-500",
              },
              {
                title: "Strawberry Garden",
                description:
                  "Fresh strawberries, vanilla bean cream, and delicate rose petals with honey drizzle",
                price: "₹2,450",
                rating: 4.8,
                reviews: 89,
                image:
                  "https://amycakesbakes.com/wp-content/uploads/2021/07/Fresh-Strawberry-Cake-by-Amycakes-Bakes.jpg",
                badge: "Seasonal",
                badgeColor: "from-rose-500 to-pink-500",
              },
              {
                title: "Red Velvet Royale",
                description:
                  "Classic red velvet with cream cheese frosting and white chocolate curls",
                price: "₹2,650",
                rating: 4.9,
                reviews: 203,
                image:
                  "https://tse2.mm.bing.net/th?id=OIP.udBr42Cpf-ZBjzeJEzYGVgHaFr&pid=Api&P=0&h=180",
                badge: "Classic",
                badgeColor: "from-amber-500 to-orange-500",
              },
            ].map((cake, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cake.image || "/placeholder.svg"}
                    alt={cake.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Badge
                    className={`absolute top-4 left-4 bg-gradient-to-r ${cake.badgeColor} text-white font-semibold px-3 py-1 rounded-full shadow-lg`}
                  >
                    {cake.badge}
                  </Badge>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  >
                    <Heart className="h-4 w-4 text-gray-600 hover:text-rose-500 transition-colors" />
                  </Button>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                      {cake.title}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-amber-400 fill-current"
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium ml-1">
                        {cake.rating}
                      </span>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {cake.description}
                  </CardDescription>
                  <div className="text-xs text-gray-500 mt-2">
                    {cake.reviews} reviews
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {cake.price}
                    </span>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-2xl px-8 py-3"
            >
              View All Masterpieces
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              The Sweet Dreams Difference
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We don't just bake cakes; we craft experiences that create lasting
              memories and bring joy to every celebration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ChefHat,
                title: "Master Artisans",
                description:
                  "Our award-winning bakers bring decades of expertise and passion to every creation",
                color: "from-amber-500 to-orange-500",
              },
              {
                icon: Clock,
                title: "Fresh Daily",
                description:
                  "Every cake is baked fresh daily using premium, locally-sourced ingredients",
                color: "from-emerald-500 to-green-500",
              },
              {
                icon: Heart,
                title: "Made with Love",
                description:
                  "Each creation is infused with passion, care, and attention to the finest details",
                color: "from-rose-500 to-pink-500",
              },
              {
                icon: Award,
                title: "Award Winning",
                description:
                  "Recognized for excellence in taste, presentation, and innovative cake artistry",
                color: "from-purple-500 to-indigo-500",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-8">
                  <div
                    className={`bg-gradient-to-br ${feature.color} rounded-3xl p-6 w-20 h-20 mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}
                  >
                    <feature.icon className="h-8 w-8 text-white mx-auto" />
                  </div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                  ></div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
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
      <section className="py-24 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Sweet Words from Our Customers
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear what our delighted
              customers have to say about their sweet experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Wedding Client",
                content:
                  "The wedding cake was absolutely breathtaking! Not only was it the most beautiful cake I've ever seen, but it tasted like heaven. Our guests are still talking about it months later!",
                rating: 5,
                image: "https://avatar.vercel.sh/sarah",
              },
              {
                name: "Michael Chen",
                role: "Birthday Celebration",
                content:
                  "Ordered a custom birthday cake for my daughter and it exceeded all expectations. The attention to detail was incredible, and the smile on her face was priceless!",
                rating: 5,
                image: "https://avatar.vercel.sh/michael",
              },
              {
                name: "Emily Rodriguez",
                role: "Corporate Event",
                content:
                  "Professional service and absolutely delicious cakes for our company event. The presentation was stunning and every single person asked where we got the cakes from!",
                rating: 5,
                image: "https://avatar.vercel.sh/emily",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className="border-0 shadow-xl bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-amber-200"
                    />
                    <div>
                      <div className="font-bold text-gray-900">
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

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Quality Guarantee",
                description:
                  "100% satisfaction guaranteed with premium ingredients and expert craftsmanship",
                color: "from-emerald-500 to-green-500",
              },
              {
                icon: Truck,
                title: "Fast Delivery",
                description:
                  "Same-day delivery available for orders placed before 2 PM in the city",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Gift,
                title: "Custom Designs",
                description:
                  "Personalized cakes tailored to your vision and special occasions",
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`bg-gradient-to-br ${feature.color} rounded-2xl p-4 w-16 h-16 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="h-8 w-8 text-white mx-auto" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3 text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Ready to Create Sweet Memories?
            </h2>
            <p className="text-xl lg:text-2xl mb-12 opacity-90 leading-relaxed">
              Let us transform your special moments into unforgettable
              experiences with our artisan cake creations.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-amber-600 hover:bg-gray-100 rounded-2xl h-16 px-10 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Cake className="h-6 w-6 mr-3" />
                Order Custom Cake
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-amber-600 rounded-2xl h-16 px-10 text-lg font-semibold"
              >
                <Phone className="h-6 w-6 mr-3" />
                Call Us Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
