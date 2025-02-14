export interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: decimal;
  productStock: number;
  productDeleted: boolean;
  productCategory: string;
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

export interface Command {
  ordersId: number;
  ordersUserEmail: string;
  ordersStatus: string;
  ordersTotal: number;
}

export interface CommandProduct {
  ordersId: number;
  productId: number;
  quantite: number;
}

export interface CommandProductWithQuantity extends Product {
  quantity: number;
}
export interface LoginFormInput {
  [x: string]: any;
  userEmail: string;
  userPassword: string;
}
