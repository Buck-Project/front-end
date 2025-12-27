import {EnhancedProductGallery} from "@/components/product/EnhancedProductGallery";
import {ProductCard} from "@/components/product/ProductCard";
import {ReviewCard} from "@/components/product/ReviewCard";
import {SizeGuide} from "@/components/product/SizeGuide";

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