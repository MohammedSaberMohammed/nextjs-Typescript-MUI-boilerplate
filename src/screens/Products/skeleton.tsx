// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { LayoutSettings } from '@/configs/layout';

const LoadingSkeleton = () => {
  return (
    <>
      {Array.from(Array(LayoutSettings.initialPerPage).keys()).map((i: number) => (
        <Grid key={i} item px={0} xs={12} md={6} lg={4}>
          <Skeleton animation='wave' variant="rectangular" width='100%' height={200} />
                
          <Box sx={{ mt: 2, mb: .5 }}>
            <Skeleton animation='wave' width="40%" />
            <Skeleton animation='wave' width="80%"  />
          </Box>
            
          <Skeleton animation='wave' width="40%" height={60} />
        </Grid>
      ))
      }
    </>
  );
};

export default LoadingSkeleton;
