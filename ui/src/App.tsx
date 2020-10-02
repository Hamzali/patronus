import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Theme from "./Theme";
import Layout from "./Layout";

function App() {
  return (
    <Theme>
      <Router>
        <Layout>
          <AppRoutes />
        </Layout>
      </Router>
    </Theme>
  );
}

export default App;
