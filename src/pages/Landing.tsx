import { useNavigate } from "react-router-dom";
import {ProductCard} from "@/components/product/ProductCard";
import Main from "@/components/product/main"

function Landing() {
	const Navigate = useNavigate();

	return (
		<div>
			<Main/>
		</div>
	);
}

export default Landing;
