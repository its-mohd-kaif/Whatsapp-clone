import Login from "./components/form/Login";
import Signup from "./components/form/Signup";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ContactList from "./components/main/ContactList";
import Error from "./components/error/Error";
import { ProtectedRoute } from "./components/protected/Protected";
import ChatSection from "./components/main/ChatSection";
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/signup",
      element: <Signup />,
      errorElement: <Error />,
    },
    {
      path: "/contacts",
      element: (
        <ProtectedRoute>
          <ContactList />
        </ProtectedRoute>
      ),
      errorElement: <Error />,
      children: [
        {
          path: "/contacts/chat",
          element: (
            <ProtectedRoute>
              <ChatSection />
            </ProtectedRoute>
          ),
          errorElement: <Error />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
