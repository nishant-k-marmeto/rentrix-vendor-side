import React from "react";
import ReactDOM from "react-dom/client";
import { Link, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout, Alert, Button } from "antd";
import Layout from "./component/LayoutMain";
import Login from "./component/Login";
import SignupPage from "./component/SignupPage";
import "./styles.css"
import Dashboard from "./component/Dashboard"
import HeaderMain from "./component/HeaderMain";
import ProtectedRoute from "./component/ProtectedRoute";
import { AuthProvider } from "./authContext/AuthContext";


export default function App() {
  return (

    <Layout>
      <HeaderMain />
      <Outlet />
    </Layout>

  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />
  },

  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute
        element={<Dashboard />}
      />
    ),
    errorElement: <Alert
      message="Error Text"
      showIcon
      description="Error Description Error Description Error Description Error Description"
      type="error"
      action={
        <Button size="small" danger>
          Detail
        </Button>
      }
    />,
  },
],
);

const root = ReactDOM.createRoot(document.getElementById("app")); // Use createRoot
root.render( <AuthProvider><RouterProvider router={appRouter} /></AuthProvider>);