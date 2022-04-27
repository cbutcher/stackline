import getProductByIdMock from "../../../mockApi/getProductByIdMock";
import { ProductModel } from "./productModels";

export interface GetProductByIdRequestParams {
  readonly productId: string;
}

export type GetProductByIdRequestResponse = ProductModel;

export default async function getProductById({ productId }: GetProductByIdRequestParams): Promise<GetProductByIdRequestResponse> {
  return getProductByIdMock(productId);
}
