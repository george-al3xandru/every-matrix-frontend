import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Landing } from "./pages";
import { Layout } from "./layouts";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
