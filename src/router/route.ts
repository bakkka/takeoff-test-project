import ContactsPage from "../pages/ContactsPage/ContactsPage";
import LoginPage from "../pages/LoginPage/LoginPage";

export  const privateRoutes=[
    {path:'/contacts',element:ContactsPage},
]
export  const publicRoutes=[
    {path:'/login',element:LoginPage},
    {path:'/*',element:LoginPage}
]