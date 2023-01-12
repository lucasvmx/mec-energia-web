import { selectErrorNotification, setIsErrorNotificationOpen } from "@/store/appSlice";
import { Alert, Snackbar } from "@mui/material"
import { useDispatch, useSelector } from "react-redux";


const ErrorNotification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(selectErrorNotification)
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setIsErrorNotificationOpen({
      isOpen: false,
    }))
  };

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {notification.text}
      </Alert>
    </Snackbar>
  )
}
export default ErrorNotification;