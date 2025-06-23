export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: "digital" | "courses" | "physical";
  type: string;
  rating: number;
  features: string[];
}
