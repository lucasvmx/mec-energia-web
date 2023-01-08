import { Alert, Snackbar } from "@mui/material"

type SucessNotificationProps = {
  open: boolean,
  message: string,
  handleClose: () => void
}

const SucessNotification = (props: SucessNotificationProps) => {
  const { open, message, handleClose } = props
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}
export default SucessNotification;