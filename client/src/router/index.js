import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RegisterPage from "../pages/RegisterPage";
import CheckEmailPage from "../pages/CheckEmailPage";



const router = createBrowserRouter(
      {
            path: '/',
            element: <App/>,
            children: [
                  {
                        path: '/register',
                        element:<RegisterPage/>
                  },
                  {
                        path: '/email',
                        element:<CheckEmailPage/>
                  },
                  {
                        path: '/password',
                        element:<CheckPasswordPage/>
                  },
                  {
                        path: "",
                        element:<Home/>
                  }

            ]

      }

)

export default router
