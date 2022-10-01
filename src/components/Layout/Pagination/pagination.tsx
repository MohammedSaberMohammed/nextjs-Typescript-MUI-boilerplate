import { FC, useEffect, useMemo, useState } from 'react';
// MUI
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
// Models
import { PaginationExportedDataModel, PaginationResponse } from '@/models/Pagination';
// Utils
import { LayoutSettings } from '@/configs/layout';

interface Props {
  page?: number,
  perPage?: number,
  additionalPayload?: any,
  initialData?: PaginationResponse,
  // eslint-disable-next-line no-unused-vars
  children: (data: PaginationExportedDataModel) => any,
  // eslint-disable-next-line no-unused-vars
  callback: (query?: any) => any
}

const PaginationLayout: FC<Props> = ({
  page,
  perPage,
  callback,
  children,
  initialData,
  additionalPayload
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(page);
  const [loadedData, setLoadedData] = useState<any[]>([]);

  const requestPayload = useMemo(() => ({
    page: pageIndex, 
    perPage,
    ...additionalPayload
  }), [pageIndex, perPage, additionalPayload]);

  const availablePages = useMemo(() => Math.ceil(totalCount / (perPage || LayoutSettings.initialPerPage)), [perPage, totalCount]);

  const processData = (response: PaginationResponse) => {
    setTotalCount(response.total);
    setLoadedData(response.data);

    setIsLoading(false);
  };

  const fetchData = async () => {
    setIsLoading(true);
    // Call
    const { ok, data } = await callback(requestPayload);

    if(ok && data) {
      processData(data);
    }
  };

  const onChangePageIndex = (...params: any) => {
    setPageIndex(params[1]);
  };

  useEffect(() => {
    if(!isMounted && initialData) {
      processData(initialData);

      setIsMounted(true);
      return;
    }

    fetchData();

    if(!isMounted) {
      setIsMounted(true);
    }
  }, [requestPayload]);

  return (
    <Box display='flex' flexDirection='column' sx={{width: '100%'}}>

      {children({
        isLoading,
        data: loadedData
      })}

      <Box display='flex' alignItems='center' justifyContent='center' mt={5}>
        <Pagination
          color='secondary' 
          count={availablePages}
          shape='rounded'
          page={pageIndex}
          onChange={onChangePageIndex}
        />
      </Box>
    </Box>
  );
};

PaginationLayout.defaultProps = {
  page: 1,
  perPage: LayoutSettings.initialPerPage,

  additionalPayload: {}
};

export {
  PaginationLayout
};
