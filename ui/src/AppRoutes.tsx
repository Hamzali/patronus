import React, { FunctionComponent } from "react";
import { Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import ClusterDetail from "./pages/ClusterDetail";
import NotFound from "./pages/NotFound";

const AppRoutes: FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/:clusterId" exact component={ClusterDetail} />
      <Route path="" component={NotFound} />
    </Switch>
  );
};

export default AppRoutes;
