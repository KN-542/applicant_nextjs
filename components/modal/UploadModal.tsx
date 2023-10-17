import React, { useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
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
import { common } from '@material-ui/core/colors'

type Props = {
  open: boolean
  closeModal: () => void
  afterFuncAsync: (f: File) => Promise<void>
}

const UploadModal = (props: Props) => {
  const t = useTranslations()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    acceptedFiles.forEach(props.afterFuncAsync) // 選択されたすべてのファイルを読み込む
  }, [acceptedFiles])

  return (
    <Dialog open={props.open} maxWidth="lg">
      <DialogTitle component="div">
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {t('common.title.modal.upload')}
        </Typography>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Typography variant="h6">
          応募者情報のファイルアップロードを行ってください
        </Typography>
        <Box
          sx={{
            m: '0 auto',
            mt: 3,
            mb: 3,
            border: '2px dashed #ccc',
            backgroundColor: '#eee',
            color: '#bbb',
            minWidth: 800,
            minHeight: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: common.white,
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} accept=".txt" />{' '}
          <p>
            ここにファイルをドラッグ＆ドロップ、またはここをクリックしてファイル選択
          </p>
        </Box>
      </DialogContent>

      <Divider sx={{ mb: 2 }} />

      <DialogActions sx={{ mr: 2, mb: 2 }}>
        <Button variant="outlined" color="inherit" onClick={props.closeModal}>
          {t('common.button.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploadModal
