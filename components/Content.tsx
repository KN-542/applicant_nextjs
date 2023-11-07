import { Contents } from '@/types/management'
import { DialogContent, Box, Divider } from '@mui/material'
import { map } from 'lodash'
import {
  DialogKey,
  DialogContentMain,
  DialogValue,
  DialogKeyChild,
} from '@/styles/index'

type Props = {
  data: Contents[]
}

const Content = (props: Props) => {
  return (
    <DialogContent sx={DialogContentMain}>
      {map(props.data, (item, index) => {
        return (
          <Box key={index} sx={DialogKey}>
            <Box sx={DialogKeyChild}>{item.key}</Box>
            <Divider orientation="vertical" flexItem />
            <Box sx={DialogValue}>{item.element}</Box>
          </Box>
        )
      })}
    </DialogContent>
  )
}

export default Content
