export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productStock: number;
  productDeleted: boolean;
  productCategory: String;
}

export interface Filters {
  [key: string]: string;
}

export interface CartProps {
  articleId: number;
  quantity: number;
  stock: number;
}

export interface CartSelectorProps {
  stock: number;
  articleId: number;
}
