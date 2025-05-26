import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const Route = createFileRoute('/app/about/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-12 py-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">About Cack Shop</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Crafting delicious cakes and pastries with love since 2020
        </p>
      </div>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Our Story</CardTitle>
            <CardDescription>How it all began</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Cack Shop started as a small home kitchen with a big dream - to bring joy through 
              delicious, handcrafted cakes and pastries. What began as a passion project quickly 
              grew into a beloved local bakery, known for our attention to detail and commitment 
              to quality.
            </p>
            <p>
              Today, we continue to bake with the same love and dedication that we started with, 
              using only the finest ingredients to create memorable treats for every occasion.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>What drives us every day</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              At Cack Shop, our mission is simple: to create exceptional baked goods that bring 
              people together. We believe that every cake, cookie, and pastry should not only 
              taste amazing but also create lasting memories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4">
                <h3 className="font-semibold mb-2">Quality</h3>
                <p className="text-sm text-muted-foreground">Using only the finest ingredients</p>
              </div>
              <div className="text-center p-4">
                <h3 className="font-semibold mb-2">Creativity</h3>
                <p className="text-sm text-muted-foreground">Unique designs and flavors</p>
              </div>
              <div className="text-center p-4">
                <h3 className="font-semibold mb-2">Service</h3>
                <p className="text-sm text-muted-foreground">Exceptional customer experience</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Team Section */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Our Team</CardTitle>
            <CardDescription>The passionate people behind Cack Shop</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="font-semibold">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Head Baker & Founder</p>
              </div>
              <div className="text-center">
                <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4"></div>
                <h3 className="font-semibold">Michael Chen</h3>
                <p className="text-sm text-muted-foreground">Pastry Chef</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
