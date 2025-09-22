
import { createBrowserRouter } from "react-router";

import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
            path:"/",
            element:<Home/>
        },{
            path:"/Login",
            element:<Login/>
        },{
            path:"/Register",
            element:<Register/>
        }
        ,{
            path:"*",
            element:<NotFound/>
        }
    ]
    }
])

export default router