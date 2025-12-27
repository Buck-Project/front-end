import { useNavigate } from "react-router-dom";
import Main from "@/components/product/main"

function Landing() {
    // const Navigate = useNavigate(); // 👈 حذف شد

	return (
		<div>
			<Main/>
		</div>
	);
}

export default Landing;