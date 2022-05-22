import { IProduct } from './IProduct'

export interface IProductFormatted extends IProduct {
  priceFormatted: string
}
