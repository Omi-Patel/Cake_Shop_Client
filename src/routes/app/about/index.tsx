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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge className="bg-slate-100 text-slate-700 px-6 py-3 text-lg font-medium border border-slate-200">
              Our Story
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-light tracking-tight">
              <span className="text-slate-900">About</span>
              <br />
              <span className="font-medium text-slate-700">Sweet Dreams</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
              Crafting delicious cakes and pastries with love, passion, and
              artistry since 2008. Every creation tells a story.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16 space-y-20">
        {/* Story Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white border-slate-200 rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-slate-50 p-12">
              <CardTitle className="text-3xl font-medium text-slate-900 mb-4">
                Our Story
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 font-light">
                How it all began
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12 space-y-6">
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                Sweet Dreams Bakery started as a small home kitchen with a big
                dream - to bring joy through delicious, handcrafted cakes and
                pastries. What began as a passion project by our founder, Sarah
                Johnson, quickly grew into a beloved local bakery, known for our
                attention to detail and commitment to quality.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                Today, we continue to bake with the same love and dedication
                that we started with, using only the finest ingredients to
                create memorable treats for every occasion. Each cake is a work
                of art, meticulously crafted to not just taste amazing, but to
                create lasting memories.
              </p>
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                From intimate birthday celebrations to grand wedding receptions,
                we've had the privilege of being part of thousands of special
                moments, and we're honored to continue this sweet journey.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Mission & Values Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white border-slate-200 rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-slate-50 p-12">
              <CardTitle className="text-3xl font-medium text-slate-900 mb-4">
                Our Mission & Values
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 font-light">
                What drives us every day
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12 space-y-8">
              <p className="text-lg text-slate-700 leading-relaxed font-light">
                At Sweet Dreams Bakery, our mission is simple: to create
                exceptional baked goods that bring people together. We believe
                that every cake, cookie, and pastry should not only taste
                amazing but also create lasting memories and moments of pure
                joy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="bg-slate-900 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-medium text-xl text-slate-900 mb-3">
                    Quality
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Using only the finest ingredients and time-honored
                    techniques
                  </p>
                </div>

                <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="bg-slate-900 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-medium text-xl text-slate-900 mb-3">
                    Creativity
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Unique designs and innovative flavors that surprise and
                    delight
                  </p>
                </div>

                <div className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="bg-slate-900 rounded-2xl p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-medium text-xl text-slate-900 mb-3">
                    Service
                  </h3>
                  <p className="text-slate-600 leading-relaxed font-light">
                    Exceptional customer experience from order to delivery
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Team Section */}
        <section className="max-w-6xl mx-auto">
          <Card className="bg-white border-slate-200 rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="bg-slate-50 p-12">
              <CardTitle className="text-3xl font-medium text-slate-900 mb-4">
                Meet Our Team
              </CardTitle>
              <CardDescription className="text-xl text-slate-600 font-light">
                The passionate artisans behind Sweet Dreams
              </CardDescription>
            </CardHeader>
            <CardContent className="p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <ChefHat className="h-16 w-16 text-slate-600" />
                    </div>
                  </div>
                  <h3 className="font-medium text-xl text-slate-900 mb-2">
                    Sarah Johnson
                  </h3>
                  <p className="text-slate-600 font-medium mb-3">
                    Head Baker & Founder
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    With over 15 years of experience, Sarah brings passion and
                    artistry to every creation.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Cake className="h-16 w-16 text-slate-600" />
                    </div>
                  </div>
                  <h3 className="font-medium text-xl text-slate-900 mb-2">
                    Michael Chen
                  </h3>
                  <p className="text-slate-600 font-medium mb-3">Pastry Chef</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Specializing in delicate pastries and innovative flavor
                    combinations.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="relative mb-8">
                    <div className="w-40 h-40 rounded-full bg-slate-100 mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Star className="h-16 w-16 text-slate-600" />
                    </div>
                  </div>
                  <h3 className="font-medium text-xl text-slate-900 mb-2">
                    Emma Rodriguez
                  </h3>
                  <p className="text-slate-600 font-medium mb-3">
                    Cake Designer
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
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
          <Card className="bg-slate-900 text-white rounded-2xl shadow-lg overflow-hidden">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-medium mb-4">
                  Sweet Dreams by the Numbers
                </h3>
                <p className="text-xl text-slate-300 font-light">
                  Our journey in delicious statistics
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-medium mb-2">15+</div>
                  <div className="text-lg text-slate-300 font-light">
                    Years of Excellence
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-medium mb-2">10K+</div>
                  <div className="text-lg text-slate-300 font-light">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-medium mb-2">50K+</div>
                  <div className="text-lg text-slate-300 font-light">
                    Cakes Created
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-medium mb-2">25+</div>
                  <div className="text-lg text-slate-300 font-light">
                    Awards Won
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
