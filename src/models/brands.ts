interface BrandLogo {
  id: number,
  uuid: string,
  name: string,
  file_name: string,
  mime_type: string,
  size: number,
  generated_conversions: [],
  order_column: number,
  created_at: string,
  updated_at: string,
  url: string,
  large: string,
  medium: string,
  small: string,
  collection: string,
}

export interface BrandModel {
  id: number,
  name: string,
  created_at: string | null,
  updated_at: string | null,
  logo: BrandLogo
}