interface PaginationLink {
  url: string,
  label: string,
  active: string
}

export interface PaginationResponse {
  current_page: number,
  data: any[],
  first_page_url: string,
  from: number,
  last_page: number,
  last_page_url: string,
  links: PaginationLink[],
  next_page_url: string
  path: string, 
  per_page: string,
  prev_page_url: string,
  to: number,
  total: number
}