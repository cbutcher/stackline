import { MockProductModel, MockProductSaleModel, MockProductReviewModel } from "../../../mockApi/getProductByIdMock";

// Re-exporting types from mock files to prevent duplication while still breaking dependency
// mock files from other product code
export type ProductSaleModel = MockProductSaleModel;
export type ProductReviewModel = MockProductReviewModel;
export type ProductModel = MockProductModel;