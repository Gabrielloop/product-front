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
