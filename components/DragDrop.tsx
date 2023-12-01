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
import { Bold, DragDropArea, mb, mr } from '@/styles/index'

type Props = {
  afterFuncAsync: (f: File, dropArea: string) => Promise<void>
  title: JSX.Element
  dropAreaIdentifier: string
}

const DragDrop = (props: Props) => {
  const t = useTranslations()

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  useEffect(() => {
    acceptedFiles.forEach((file) =>
      props.afterFuncAsync(file, props.dropAreaIdentifier),
    )
  }, [acceptedFiles])

  return (
    <DialogContent>
      <Typography component="h6" sx={[mb(2), Bold]}>
        {props.title}
      </Typography>
      <Box sx={DragDropArea} {...getRootProps()}>
        <input {...getInputProps()} /> <p>{t('features.main.uploadMsg')}</p>
      </Box>
    </DialogContent>
  )
}

export default DragDrop
