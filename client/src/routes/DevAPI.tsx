import { useState } from "react";
import RouterDescription from "../components/api/RouterDescription";
import backendRoutes from "../../public/backendMap.json";
import "../styles/api.css";

export default function DevAPI() {
  const [ route, setRoute ] = useState(0);

  return (
    <div className="api">
      <nav>
        {backendRoutes.map((routes, i) =>
          <button
            key={i}
            onClick={() => setRoute(i)}
            className={`${route === i ? "route_nav_button_active" : ""}`}
          >
            {routes.name}
          </button>
        )}
      </nav>
      <RouterDescription
        description={backendRoutes[route]}
      />
    </div>
  )
}