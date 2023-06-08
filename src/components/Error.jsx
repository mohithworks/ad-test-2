import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';

function Error({ msg }) {
  return (
    <Alert status="error">
        <AlertIcon />
        <AlertDescription>{msg}</AlertDescription>
    </Alert>
  )
}

export default Error