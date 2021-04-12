import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Moody from "./pages/Moody";
import StartPage from "./pages/StartPage";

const queryClient = new QueryClient();

export default function Router() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Switch>
          <Route path="/moody">
            <Moody />
          </Route>
          <Route path="/">
            <StartPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
