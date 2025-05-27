"use client";

import { createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Heart,
  Star,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export const Route = createFileRoute("/app/contact-us/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log(values);

    toast.success(
      "Message sent successfully! We'll get back to you within 24 hours."
    );

    form.reset();
    setIsSubmitting(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 text-white py-32">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/20 backdrop-blur-sm text-white mb-8 px-6 py-3 text-lg font-semibold">
              Let's Connect
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl opacity-90 leading-relaxed max-w-3xl mx-auto">
              We'd love to hear from you. Whether you have questions about our
              cakes, want to place a custom order, or just want to say hello,
              we're here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-5 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Let's Create Something Sweet Together
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Have a question about our cakes or want to discuss a custom
                order? We're passionate about creating the perfect sweet
                experience for you.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white rounded-3xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      Email Us
                    </h3>
                    <p className="text-gray-600">hello@sweetdreamsbakery.com</p>
                    <p className="text-sm text-gray-500">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white rounded-3xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Call Us</h3>
                    <p className="text-gray-600">(555) 123-CAKE</p>
                    <p className="text-sm text-gray-500">Mon-Sat: 7AM-8PM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white rounded-3xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="h-6 w-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      Visit Our Bakery
                    </h3>
                    <p className="text-gray-600">
                      123 Baker Street, Sweet City
                    </p>
                    <p className="text-sm text-gray-500">
                      Come see our magic in action
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-xl hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm hover:bg-white rounded-3xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      Opening Hours
                    </h3>
                    <p className="text-gray-600">Mon-Sat: 7AM-8PM</p>
                    <p className="text-gray-600">Sunday: 8AM-6PM</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Customer Testimonial */}
            <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-amber-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "The team at Sweet Dreams made our wedding cake dreams come
                true! Their attention to detail and customer service is
                exceptional."
              </p>
              <div className="flex items-center">
                <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-full p-2 mr-3">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Sarah & Mike</div>
                  <div className="text-sm text-gray-600">Wedding Clients</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-md rounded-3xl overflow-hidden">
              <CardContent className="p-12">
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl p-3 mr-4">
                      <MessageCircle className="h-6 w-6 text-amber-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">
                      Send us a message
                    </h2>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Fill out the form below and we'll get back to you within 24
                    hours. We can't wait to help make your sweet dreams come
                    true!
                  </p>
                </div>

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-800 font-semibold text-lg">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="h-14 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 rounded-2xl text-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-800 font-semibold text-lg">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email address"
                                type="email"
                                className="h-14 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 rounded-2xl text-lg"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-lg">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              className="h-14 border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 rounded-2xl text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-800 font-semibold text-lg">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your inquiry. The more details you provide, the better we can help you create something amazing!"
                              className="min-h-[160px] border-2 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 transition-all duration-300 resize-none rounded-2xl text-lg"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transform hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-2xl rounded-2xl"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center space-x-3">
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Sending your message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center space-x-3">
                          <Send className="h-6 w-6" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Bottom CTA Section */}
      <section className="bg-gradient-to-r from-gray-50 to-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Prefer to reach out directly?
          </h3>
          <p className="text-gray-600 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            For urgent matters or if you prefer a more direct approach, feel
            free to call or email us directly. We're always happy to chat about
            cakes!
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 border-2 border-amber-300 hover:bg-amber-50 hover:border-amber-400 transition-all duration-300 rounded-2xl text-lg font-semibold"
            >
              <Mail className="h-6 w-6 mr-3" />
              Email Us
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-14 px-8 border-2 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 transition-all duration-300 rounded-2xl text-lg font-semibold"
            >
              <Phone className="h-6 w-6 mr-3" />
              Call Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
