export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: decimal;
  productStock: number;
  productDeleted: boolean;
  productCategory: String;
  productImage: string | undefined;
}

export interface Filters {
  [key: string]: string;
}

export interface CartProps {
  product: Product;
  quantity: number;
}

export interface CartSelectorProps {
  product: Product;
}
