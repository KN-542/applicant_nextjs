import { Contents } from '@/types/management'
import { common } from '@material-ui/core/colors'
import { DialogContent, Box, Divider } from '@mui/material'
import { map } from 'lodash'

type Props = {
  data: Contents[]
}

const Content = (props: Props) => {
  return (
    <DialogContent
      sx={{
        backgroundColor: common.white,
        width: '80%',
        margin: '0 auto',
        mt: 15,
        boxShadow: '0 4px 8px',
        p: 3,
        borderRadius: 20,
      }}
    >
      {map(props.data, (item, index) => {
        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 5,
            }}
          >
            <Box
              sx={{
                width: '20%',
                fontWeight: 'bold',
                fontSize: 20,
                padding: 2,
              }}
            >
              {item.key}
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                width: '90%',
                textAlign: 'center',
                fontSize: 20,
                padding: 2,
              }}
            >
              {item.element}
            </Box>
          </Box>
        )
      })}
    </DialogContent>
  )
}

export default Content
