import { createContext, FC, ReactNode, useState } from 'react';
// Lang
import { useTranslation } from 'next-i18next';

export const LayoutContext = createContext({
  isRTL: true
});

interface Props {
  children?: ReactNode;
}

const LayoutProvider: FC<Props> = (props) => {
  const { i18n } = useTranslation();
  const [isRTL] = useState(i18n.dir() === 'rtl');

  return (
    <LayoutContext.Provider value={{ isRTL }}>
      {props.children}
    </LayoutContext.Provider>
  );
};

export default LayoutProvider;
