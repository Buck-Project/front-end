import { EnhancedProductGallery } from "@/components/Product_tmp/EnhancedProductGallery";
import ProductCard from "@/components/Product_tmp/ProductCard";
import { ReviewCard } from "@/components/Product_tmp/ReviewCard";
import { SizeGuide } from "@/components/Product_tmp/SizeGuide";

function Main() {

	return (
		<div>
			<EnhancedProductGallery
            images = {["asjjdaja","fjsdjsj","dsgjgsjgd"]}
			hasVideo = {false}
            />
            
            <ProductCard
            id = {1}
            name="hi"
            price={12}
            image="/123"
            rating={4.5}
            reviews={3}
            />
            <ReviewCard
            name="hello"
            rating={3}
            date="12/12"
            comment="f u"
            helpful={1}
            />
            <SizeGuide/>
		</div>
	);
}

export default Main;
