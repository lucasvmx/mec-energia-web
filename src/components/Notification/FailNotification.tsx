import { Alert, Snackbar } from "@mui/material"

type FailNotificationProps = {
  open: boolean,
  message: string,
  handleClose: () => void
}

const FailNotification = (props: FailNotificationProps) => {
  const { open, message, handleClose } = props

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default FailNotification;