interface HeaderMenuItemProps {
  onClick?: () => void;
  className?: string
}

export interface HeaderMenuItem {
  title: string,
  link?: string,
  iconPath?: string,
  suffix?: string | number,
  props?: HeaderMenuItemProps
}

export interface HeaderMenu {
  id: string,
  title: string,
  iconPath?: string,
  items: HeaderMenuItem[]
}
