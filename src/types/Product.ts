export interface Product {
  id: number,
  title: string,
  price: string,
  description: string,
  category: Category,
  images: string[]
}

interface Category {
  id: number,
  name: string,
  image: string
}