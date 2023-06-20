import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { store } from "./store"

import { Layout } from "./layouts"
import { HomePage, LoginPage, RegisterPage } from "./pages"
import { Provider } from "react-redux"

const router = createBrowserRouter([
   {
      path: "/",
      element: <Layout />,
      children: [
         {
            index: true,
            element: <HomePage />
         },
         {
            path: "login",
            element: <LoginPage />
         },
         {
            path: "register",
            element: <RegisterPage />
         },
         {
            path: "*",
            element: <Navigate to="/" replace />
         }
      ]
   }
])

export function App() {
   return (
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   )
}
