import "./App.css";
import AllUsers from "./components/AllUsers";
import Navbar from "./components/Layout/Navbar";
import { Provider } from "react-redux";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import store from "./redux/store";
import CreateNewUSer from "./components/pages/CreateNewUser";
import UpdateUser from "./components/pages/UpdateUser";
function App() {
  return (
    <Provider store={store}>
      
        <Navbar />
        <Outlet />
      
    </Provider>
  );
}
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
          path:"/",
          element:<AllUsers/>
      },
      
      {
        path: "/createnewuser",
        element: <CreateNewUSer />,
      },
      {
        path: "/updateuser/:id",
        element: <UpdateUser />,
      },
    ]
  },
 
]);

export default App;
