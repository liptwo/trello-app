import Alert from '@mui/material/Alert'

// Component cay -có nhiệm vụ tra.ve một Alert.Message.cho. field.chi đinh (neu co)
function FieldErrorAlert({ errors, fieldName }) {
  if (!errors || !errors [fieldName] ) return null
  return (
    <Alert severity="error" sx={{ mt: '0.7em', '.MuiAlert-message': { overflow: 'hidden' } }}>
      {errors [fieldName] ?. message}
    </Alert>
  )
}
export default FieldErrorAlert