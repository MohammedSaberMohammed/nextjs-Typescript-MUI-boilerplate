import { BaseLookupOptionModel } from '@/models/lookups';

export const generateLookups = (t: any) => ({
  orderLookup: [{
    id: 'created_at&order=asc',
    label: t('fromNewestToOldest')
  }, {
    id: 'created_at&order=desc',
    label: t('fromOldestToNewest')
  },
  {
    id: 'price&order=desc',
    label: t('highestPrice')
  }, {
    id: 'price&order=asc',
    label: t('lowestPrice')
  }] as BaseLookupOptionModel[],  
});