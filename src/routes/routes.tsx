import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import ProductList from "@/pages/ProductListing"
import Temp from "@/pages/Temp";
import Error404 from "@/pages/Error404";
import Error500 from "@/pages/Error500";
import ProductManagementPage from "@/pages/BrandDash/ProductManagementPage"


export const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		errorElement: (
			<Error404 />
		),
		children: [
			{
				index: true,
				element: <Landing />,
			},
			{
				path: "/temp",
				element: <Temp />,
			},
			{
				path: "/productList",
				element: <ProductList/>
			},
			{
				path: "/error500",
				element: <Error500 />
			},
			{
				path: "ProductManagement",
				element: <ProductManagementPage />
			}
			// {
			// 	path: "/AboutUs",
			// 	element: <AboutUs />,
			// },
			// {
		],
	},
	// {
	// 	element: <PrivateLayout />,
	// 	children: [
	// 		{
	// 			path: "/EditProfile",
	// 			element: <EditProfile />,
	// 		},
	// 		{
	// 			path: "/DashBoard",
	// 			element: <DashBoard />,
	// 		},
	// 	],
	// },
	// {
	// 	element: <AnotherLayout />,
	// 	children: [
	// 		{
	// 			path: "/login",
	// 			element: <Login />,
	// 		},
	// 		{
	// 			path: "/temp",
	// 			element: <Temp />,
	// 		},
	// 	],
	// },
]);
