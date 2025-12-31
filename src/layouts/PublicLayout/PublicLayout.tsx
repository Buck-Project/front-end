import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const PublicLayout = () => {
	return (
		<>
			<Toaster
				position="bottom-right"
				richColors={true}
				duration={5000}
			// toastOptions={{
			// 	style: {
			// 		color: "red",
			// 	},
			// }}
			/>
			<Header />
			<Outlet />
			<Footer />
<<<<<<< HEAD
=======

>>>>>>> c6af0c5fd7bc08cb87078f213a2f3b071e5b4cbb
		</>
	);
};

export default PublicLayout;
