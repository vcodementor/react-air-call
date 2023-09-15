import { useRoutes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import ActivityFeed from "../pages/call/ActivityFeed";
import ActivityDetail from "../pages/call/ActivityDetail";

export default function Router() {
  
  const router = useRoutes([
    {
      element: <MainLayout /> , 
      children : [
        { path: "/", element: <ActivityFeed /> },
        { path: "/activities", element: <ActivityFeed /> },
        { path: "/activities/:callActivityId", element: <ActivityDetail /> },
      ] 
    },
  ]);

  return router;
}