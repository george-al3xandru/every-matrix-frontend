import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Favorites, Landing } from "./pages";
import { Layout } from "./layouts";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
