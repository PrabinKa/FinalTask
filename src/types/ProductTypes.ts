interface ProductDimensions {
  depth: number;
  height: number;
  width: number;
}

interface ProductMeta {
  barcode: string;
  createdAt: string;
  qrCode: string;
  updatedAt: string;
}

interface ProductReview {
  comment: string;
  date: string;
  rating: number;
  reviewerEmail: string;
  reviewerName: string;
}

export interface ProductInterface {
  availabilityStatus: string;
  brand: string;
  category: string;
  description: string;
  dimensions: ProductDimensions;
  discountPercentage: number;
  id: number;
  images: string[];
  meta: ProductMeta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: ProductReview[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

export interface ProductWithQuantity extends ProductInterface {
  quantity: number;
}

export type ProductListInterface = ProductInterface[];
