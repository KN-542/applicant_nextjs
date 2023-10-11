import { Validation } from '@/hooks/validation'
import { Box } from '@mui/material'
import { isEqual, map, filter } from 'lodash'

type Props = {
  validations: Validation[]
  type: string
}

const ErrorHandler = (props: Props) => {
  return (
    <>
      {map(
        filter(props.validations, (f) => isEqual(f.type, props.type)),
        (item, index) => {
          return (
            <Box component="p" role="alert" sx={{ color: 'red' }} key={index}>
              {item.message}
            </Box>
          )
        },
      )}
    </>
  )
}

export default ErrorHandler
