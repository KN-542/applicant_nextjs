import React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  Divider,
  Box,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import _ from 'lodash'
import {
  Bold,
  ButtonColor,
  ColorRed,
  FormButtons,
  SubTitle,
  mb,
  minW,
  modalContent,
  mr,
  mt,
  w,
} from '@/styles/index'
import DateRangeIcon from '@mui/icons-material/DateRange'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { RouterPath } from '@/enum/router'
import { useRouter } from 'next/router'
import { common, indigo } from '@mui/material/colors'

type Props = {
  open: boolean
  element: JSX.Element
  element2: JSX.Element
  submit: () => void
  cancel: () => void
}

const ConfirmModal = (props: Props) => {
  const router = useRouter()
  const t = useTranslations()

  return (
    <Dialog open={props.open} fullWidth maxWidth="xl">
      <DialogTitle component="div">
        <Typography variant="h4" sx={Bold}>
          {t('common.title.modal')}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box component="p">{t('features.main.confirmMsg')}</Box>

        <Typography
          component="h3"
          variant="h5"
          sx={[SubTitle, w(100), mb(3), mt(5)]}
        >
          <DateRangeIcon sx={mr(0.25)} />
          {t('features.main.subTitle')}
        </Typography>
        <Box sx={modalContent}>{props.element}</Box>
        <Typography
          component="h3"
          variant="h5"
          sx={[SubTitle, w(100), mb(2), mt(5)]}
        >
          <InsertDriveFileIcon sx={mr(0.25)} />
          {t('features.main.subTitle2')}
        </Typography>
        <Box sx={modalContent}>{props.element2}</Box>
      </DialogContent>

      <Divider sx={mb(2)} />

      <Box sx={[FormButtons, mb(5)]}>
        <Button
          variant="outlined"
          color="inherit"
          sx={minW(90)}
          onClick={props.cancel}
        >
          {t('common.button.cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          sx={[minW(90), ButtonColor(common.white, indigo[500])]}
          onClick={props.submit}
        >
          {t('common.button.submit')}
        </Button>
      </Box>
    </Dialog>
  )
}

export default ConfirmModal
