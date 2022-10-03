import React, { FC } from 'react';
// Next
import Link from 'next/link';
import Image from 'next/image';
// MUI
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { BreadCrumbItem } from '@/models/breadcrumb';

interface Props {
  items: BreadCrumbItem[]
}

const Breadcrumb: FC<Props> = ({ items }) => {
  return (
    <div>
      <Breadcrumbs 
        aria-label="breadcrumb"
        separator={
          <Image 
            src={'/icons/arrow-square-left.svg'} 
            width={24}
            height={24}
            alt='separator'
          />
        }
      >

        {items.map(({ link, text }: BreadCrumbItem, index) => {
          if (link) {
            return (
              <Link key={index} href={link}>
                <a className='enabled-breadcrumb'>{text}</a>
              </Link>
            );
          }

          return <Typography key={index} className='disabled-breadcrumb'>{text}</Typography>;
        })}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
