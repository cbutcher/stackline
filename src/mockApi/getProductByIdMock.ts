import products from './products.json';

export interface MockProductReviewModel {
  readonly customer: string;
  readonly review: string;
  readonly score: number;
}

export interface MockProductSaleModel {
  readonly weekEnding: string;
  readonly retailSales: number;
  readonly wholesaleSales: number;
  readonly unitsSold: number;
  readonly retailerMargin: number;
}

export interface MockProductModel {
  readonly id: string;
  readonly title: string;
  readonly image: string;
  readonly subtitle: string;
  readonly brand: string;
  readonly reviews: MockProductReviewModel[];
  readonly retailer: string;
  readonly details: string[];
  readonly tags: string[];
  readonly sales: MockProductSaleModel[];
}

// Default wait time for api to return to simulate a real network call
export const API_DELAY_MS = 400;

/**
 * Searches mocked product data for a product by id. Error cases included for completeness but
 * not exercised by assessment example.
 * @param productId 
 * @returns product with id === productId
 */
export default function getProductByIdMock(productId: string): Promise<MockProductModel> {
  const filtered = products.filter(product => product.id === productId);

  if (filtered.length === 0) {
    return Promise.reject(new Error('Product not found'));
  }
  if (filtered.length > 1) {
    return Promise.reject(new Error('Internal error: Product id not unique, multiple products found'));
  }

  return new Promise((resolve) => setTimeout(() => resolve(filtered[0]), API_DELAY_MS));
}