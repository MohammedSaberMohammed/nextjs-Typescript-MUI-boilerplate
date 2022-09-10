export interface HeaderMenuItem {
  title: string,
  link: string,
  iconPath?: string,
  suffix?: string | number,
}

export interface HeaderMenu {
  id: string,
  title: string,
  iconPath?: string,
  items: HeaderMenuItem[]
}
