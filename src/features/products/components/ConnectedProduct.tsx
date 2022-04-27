import { useEffect } from "react";
import Error from "../../../common/components/Error";
import Loading from "../../../common/components/Loading";
import { useAppDispatch, useAppSelector } from "../../../store";
import { fetchProductById } from "../slices/productSlice";
import Product from "./Product";

export interface ConnectedProductProps {
  productId: string;
}

export default function ConnectedProduct({ productId }: ConnectedProductProps) {
  const { product, status, error } = useAppSelector(state => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductById(productId))
  }, []);

  if (status === 'pending' || status === 'idle') {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (product) {
    return <Product product={product} />;
  }

  return null; // unreachable
}