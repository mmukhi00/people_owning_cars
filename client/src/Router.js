import * as React from "react";
import App from "./App";
import {createBrowserRouter} from "react-router-dom";
import ShowPage from "./components/showPage/ShowPage";

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    { path: "person/:id",
        element: <ShowPage />,
    },
]);

export default Router