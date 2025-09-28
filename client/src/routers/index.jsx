
import { createBrowserRouter } from "react-router";

import { MainLayout } from "../layouts/MainLayout";
import { Home } from "../pages/home";
import NotFound from "../pages/NotFound";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddActivities from "../pages/AddActivities";
import Activities from "../pages/Activities";
import EditActivity from "../pages/EditActivity";
const router = createBrowserRouter([
    {
        path:"/",
        element:<MainLayout/>,
        children:[
            {
            path:"/",
            element:<Home/>
        },{
            path:"/login",
            element:<Login/>
        },{
            path:"/register",
            element:<Register/>
        }
        ,{
            path:"*",
            element:<NotFound/>
        },{
            path:"/add-activities",
            element:<AddActivities/>
        },
        {
            path:"/activities",
            element:<Activities />
        },
        {
            path:"/edit-activity/:id",
            element:<EditActivity />
        }
    ]
    }
])

export default router