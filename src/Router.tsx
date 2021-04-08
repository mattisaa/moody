import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Moody from "./Moody";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Moody />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
