import { ProductModel } from "../api/productModels";
import ProductSalesTable from "./ProductSalesTable";
import "../styles/product.css";

interface ProductProps {
  readonly product: ProductModel;
}

export default function Product({ product }: ProductProps) {
  return (
    <>
      <section className="Panel LeftPanel">
        <img className="ProductImg" src={ product.image } alt={ product.title } />
        <h1>{ product.title }</h1>
        <p className="Subtitle">{ product.subtitle }</p>
        <div className="Tags">
          { product.tags.map((tag, index) => (
            <span key={`tag-${index}`} className="Tag">{ tag }</span>
          ))}
        </div>
      </section>
      <section className="Panel RightPanel">
        <h2>Retail Sales</h2>
        <ProductSalesTable sales={ product.sales } />
      </section>
    </>
  );
}