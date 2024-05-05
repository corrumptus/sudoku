import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import Layout from "./Layout";
import Jogar from "./routes/Jogar";
import DevAPI from "./routes/DevAPI";
import Quemsomos from "./routes/Quemsomos";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "jogar",
                element: <Jogar />
            },
            {
                path: "quemsomos",
                element: <Quemsomos />
            },
            {
                path: "api",
                element: <DevAPI />
            }
        ]
    }
]);

export default router;