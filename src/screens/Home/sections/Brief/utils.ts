export interface ItemModel {
  icon: string;
  title: string;
  subTitle: string;
}

const BriefItems: ItemModel[] = [
  {
    icon: '/icons/price.svg',
    title: 'specialPrices',
    subTitle: 'specialPricesDescription'
  },  
  {
    icon: '/icons/monitor.svg',
    title: 'simpleInterface',
    subTitle: 'simpleInterfaceDescription'
  },
  {
    icon: '/icons/shield.svg',
    title: 'trustAndSecurity',
    subTitle: 'trustAndSecurityDescription'
  }
];

export {
  BriefItems
};