import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Heart, Users, Cake, ChefHat, Star } from "lucide-react";

export const Route = createFileRoute("/app/about/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-amber-200/30 to-orange-300/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-300/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-6 py-3 text-lg font-semibold">
              Our Story
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gray-900">About</span>
              <br />
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
                Sweet Dreams
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Crafting delicious cakes and pastries with love, passion, and
              artistry since 2008. Every creation tells a story.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20">
        {/* Story Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 rounded-3xl shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 p-12">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                How it all began
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Sweet Dreams Bakery started as a small home kitchen with a big
                dream - to bring joy through delicious, handcrafted cakes and
                pastries. What began as a passion project by our founder, Sarah
                Johnson, quickly grew into a beloved local bakery, known for our
                attention to detail and commitment to quality.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we continue to bake with the same love and dedication
                that we started with, using only the finest ingredients to
                create memorable treats for every occasion. Each cake is a work
                of art, meticulously crafted to not just taste amazing, but to
                create lasting memories.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From intimate birthday celebrations to grand wedding receptions,
                we've had the privilege of being part of thousands of special
                moments, and we're honored to continue this sweet journey.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Mission & Values Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 rounded-3xl shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50 p-12">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission & Values
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                What drives us every day
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12 space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                At Sweet Dreams Bakery, our mission is simple: to create
                exceptional baked goods that bring people together. We believe
                that every cake, cookie, and pastry should not only taste
                amazing but also create lasting memories and moments of pure
                joy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-8 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl border border-amber-200">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">
                    Quality
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Using only the finest ingredients and time-honored
                    techniques
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl border border-rose-200">
                  <div className="bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">
                    Creativity
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Unique designs and innovative flavors that surprise and
                    delight
                  </p>
                </div>

                <div className="text-center p-8 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border border-emerald-200">
                  <div className="bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">
                    Service
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Exceptional customer experience from order to delivery
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-white/50 rounded-3xl shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50 p-12">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
                Meet Our Team
              </CardTitle>
              <CardDescription className="text-xl text-gray-600">
                The passionate artisans behind Sweet Dreams
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                      <ChefHat className="h-16 w-16 text-amber-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    Sarah Johnson
                  </h3>
                  <p className="text-amber-600 font-semibold mb-3">
                    Head Baker & Founder
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    With over 15 years of experience, Sarah brings passion and
                    artistry to every creation.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-rose-200 to-pink-300 mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                      <Cake className="h-16 w-16 text-rose-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-400/20 to-pink-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    Michael Chen
                  </h3>
                  <p className="text-rose-600 font-semibold mb-3">
                    Pastry Chef
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Specializing in delicate pastries and innovative flavor
                    combinations.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-200 to-green-300 mx-auto mb-6 flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                      <Star className="h-16 w-16 text-emerald-600" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">
                    Emma Rodriguez
                  </h3>
                  <p className="text-emerald-600 font-semibold mb-3">
                    Cake Designer
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Creating stunning visual masterpieces that are as beautiful
                    as they are delicious.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white rounded-3xl shadow-2xl overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold mb-4">
                  Sweet Dreams by the Numbers
                </h3>
                <p className="text-xl opacity-90">
                  Our journey in delicious statistics
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-lg opacity-90">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">10K+</div>
                  <div className="text-lg opacity-90">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">50K+</div>
                  <div className="text-lg opacity-90">Cakes Created</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2">25+</div>
                  <div className="text-lg opacity-90">Awards Won</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
