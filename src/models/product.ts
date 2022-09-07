interface AdvertisorInfo {
  name: string,
  date: string
}

export interface ProductItem {
  isFavorite: boolean,
  price: number | string,
  name: string,
  advertisor?: AdvertisorInfo,
  tags: string[]
}