import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./routes/routes.tsx";
import { RouterProvider } from "react-router-dom";
<<<<<<< HEAD
import PersianDigitNormalizer from "./components/PersianDigitNormalizer";
=======
// import { stats } from '@/data/about/stats';
// import { values } from '@/data/about/values';
// import { team } from '@/data/about/team';
>>>>>>> c6af0c5fd7bc08cb87078f213a2f3b071e5b4cbb

createRoot(document.getElementById("root")!).render(
	<>
		<PersianDigitNormalizer />
		<RouterProvider router={router} />
	</>
);

export default function App() {
//   const statsData = stats;     // یا مستقیم از stats استفاده کن
//   const valuesData = values;
//   const teamData = team;
//   // ...
}
