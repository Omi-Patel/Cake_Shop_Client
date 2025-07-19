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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-32">
        <div className="relative container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-white/10 backdrop-blur-sm text-white mb-8 px-6 py-3 text-lg font-medium border border-white/20">
              Let's Connect
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-light mb-8 leading-tight">
              Get in Touch
            </h1>
            <p className="text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-3xl mx-auto font-light">
              We'd love to hear from you. Whether you have questions about our
              cakes, want to place a custom order, or just want to say hello,
              we're here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-5 gap-16 max-w-7xl mx-auto">
          {/* Contact Information */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-3xl font-medium text-slate-900 mb-6">
                Let's Create Something Sweet Together
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-8 font-light">
                Have a question about our cakes or want to discuss a custom
                order? We're passionate about creating the perfect sweet
                experience for you.
              </p>
            </div>

            <div className="space-y-6">
              <Card className="p-6 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-slate-200 transition-colors duration-300">
                    <Mail className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-lg">
                      Email Us
                    </h3>
                    <p className="text-slate-600">hello@sweetdreamsbakery.com</p>
                    <p className="text-sm text-slate-500 font-light">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-slate-200 transition-colors duration-300">
                    <Phone className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-lg">Call Us</h3>
                    <p className="text-slate-600">(555) 123-CAKE</p>
                    <p className="text-sm text-slate-500 font-light">Mon-Sat: 7AM-8PM</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-slate-200 transition-colors duration-300">
                    <MapPin className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-lg">
                      Visit Our Bakery
                    </h3>
                    <p className="text-slate-600">
                      123 Baker Street, Sweet City
                    </p>
                    <p className="text-sm text-slate-500 font-light">
                      Come see our magic in action
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-2xl group">
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-slate-200 transition-colors duration-300">
                    <Clock className="h-6 w-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 text-lg">
                      Opening Hours
                    </h3>
                    <p className="text-slate-600">Mon-Sat: 7AM-8PM</p>
                    <p className="text-slate-600">Sunday: 8AM-6PM</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Customer Testimonial */}
            <Card className="p-8 border-slate-200 shadow-lg bg-slate-50 rounded-2xl">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-amber-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-slate-700 italic mb-4 leading-relaxed font-light">
                "The team at Sweet Dreams made our wedding cake dreams come
                true! Their attention to detail and customer service is
                exceptional."
              </p>
              <div className="flex items-center">
                <div className="bg-slate-900 rounded-full p-2 mr-3">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-medium text-slate-900">Sarah & Mike</div>
                  <div className="text-sm text-slate-600 font-light">Wedding Clients</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Card className="border-slate-200 shadow-lg bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-12">
                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="bg-slate-100 rounded-2xl p-3 mr-4">
                      <MessageCircle className="h-6 w-6 text-slate-600" />
                    </div>
                    <h2 className="text-3xl font-medium text-slate-900">
                      Send us a message
                    </h2>
                  </div>
                  <p className="text-slate-600 text-lg leading-relaxed font-light">
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
                            <FormLabel className="text-slate-800 font-medium text-lg">
                              Full Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                className="border-slate-200 focus:border-slate-400 rounded-lg"
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
                            <FormLabel className="text-slate-800 font-medium text-lg">
                              Email Address
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                className="border-slate-200 focus:border-slate-400 rounded-lg"
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
                          <FormLabel className="text-slate-800 font-medium text-lg">
                            Subject
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="What's this about?"
                              className="border-slate-200 focus:border-slate-400 rounded-lg"
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
                          <FormLabel className="text-slate-800 font-medium text-lg">
                            Message
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your inquiry..."
                              className="border-slate-200 focus:border-slate-400 rounded-lg min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg h-12 font-medium"
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
