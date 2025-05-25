import { Outlet, createRootRoute } from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "sonner";
// Create a client
const queryClient = new QueryClient();

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <Toaster />
        <Outlet />
      </React.Fragment>
    </QueryClientProvider>
  ),
});
