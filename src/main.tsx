import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
import PersianDigitNormalizer from "./components/PersianDigitNormalizer";

createRoot(document.getElementById("root")!).render(
	<>
		<PersianDigitNormalizer />
		<RouterProvider router={router} />
	</>
);
