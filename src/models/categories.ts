interface CategoryTitle {
  ar: string;
  en: string;
}

interface CategoryIcon {
  id: 1,
  uuid: string,
  name: string,
  file_name: string,
  mime_type: string,
  size: number,
  generated_conversions: {
    thumb: boolean
  },
  order_column: number,
  created_at: string,
  updated_at: string,
  url: string,
  large: string,
  medium: string,
  small: string,
  collection: string
}

export interface CategoryModel {
  id: number,
  title: CategoryTitle;
  slug: string,
  description: string | null,
  type: string,
  font_icon: null,
  parent_id: null,
  created_at: null,
  updated_at: null,
  icon: CategoryIcon
}