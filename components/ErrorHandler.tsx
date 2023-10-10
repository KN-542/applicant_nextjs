import { Validation } from '@/hooks/validation'
import { Box } from '@mui/material'

type Props = {
  validations: Validation[]
  type: string
}

const ErrorHandler = (props: Props) => {
  console.log(props.type)
  return (
    <>
      {props.validations
        .filter((f) => f.type === props.type)
        .map((item, index) => {
          return (
            <Box component="p" role="alert" sx={{ color: 'red' }} key={index}>
              {item.message}
            </Box>
          )
        })}
    </>
  )
}

export default ErrorHandler
