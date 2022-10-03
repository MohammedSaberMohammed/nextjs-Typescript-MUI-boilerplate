import { FC, forwardRef, ReactElement, ReactNode, Ref } from 'react';
// Next
import Image from 'next/image';
// MUI
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
// styles
import classes from './dialog.module.scss';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface Props {
  title?: string;
  subTitle?: string;
  // eslint-disable-next-line no-unused-vars
  renderActions?: (actionClassName: string) => ReactNode
}

const BaseDialog: FC<Props> = ({ title, subTitle, renderActions }) => {

  return (
    <Dialog
      open={true}
      maxWidth='sm'
      fullWidth
      TransitionComponent={Transition}
      aria-describedby="base-dialog"
      classes={{
        paper: classes.dialogPaper
      }}
    >
      <DialogContent className={classes.dialogContent}>
        <div className={classes.imageWrapper}>
          <Image 
            src='/images/check-mark.png' 
            width={33} 
            height={33} 
            alt='check mark' 
          />
        </div>

        {title && <DialogContentText id="base-dialog" className={classes.title}>{title}</DialogContentText>}
        {subTitle && <DialogContentText id="base-dialog" className={classes.subTitle}>{subTitle}</DialogContentText>}
      </DialogContent>

      {renderActions && (
        <DialogActions className={classes.actionsWrapper}>{renderActions(classes.action)}</DialogActions>
      )}
    </Dialog>
  );
};

BaseDialog.defaultProps = {
  title: '',
  subTitle: '',
};

export { BaseDialog };