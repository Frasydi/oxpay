import type { ReactNode } from "react";
import AuthLayout from "./auth/AuthLayout";
import DashboardLayout from "./dashboard/DashboardLayout";
import { publicRoutes } from "~/contexts/AuthContext";

type LayoutProps = {
    children: ReactNode;
    pathname : string;
}


export default function Layout({ children, pathname } : LayoutProps) {
    


    if(pathname == "/") {
        return children
    }

    if(publicRoutes.includes(pathname)) {
        return <AuthLayout>
            {children}
        </AuthLayout>
    }
    
    return(
        <DashboardLayout>
           { children }   
        </DashboardLayout>
    )
}