import React, { useEffect } from 'react'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  DialogContent,
  CssBaseline,
  Grid,
  Typography,
} from '@mui/material'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { common, indigo } from '@mui/material/colors'
import {
  mt,
  mb,
  w,
  DialogContentMain,
  M0Auto,
  FormBox,
  ml,
  mr,
  FormButtons,
  minW,
} from '@/styles/index'
import NextHead from '@/components/Header'

// 日付と時刻の選択肢を生成
const generateDateOptions = (daysRange = 10) => {
  const options = []
  const today = new Date()
  for (let i = 0; i < daysRange; i++) {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i,
    )
    options.push(date.toISOString().split('T')[0])
  }
  return options
}

const generateTimeOptions = () => {
  const options = []
  for (let hour = 0; hour < 24; hour++) {
    options.push(`${hour.toString().padStart(2, '0')}:00`)
  }
  return options
}

const dateOptions = generateDateOptions()
const timeOptions = generateTimeOptions()

type MakeInputs<T extends number> = Record<`date${T}` | `time${T}`, string>

type Inputs = MakeInputs<1> &
  MakeInputs<2> &
  MakeInputs<3> &
  MakeInputs<4> &
  MakeInputs<5>

const Applicant = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      date1: '',
      time1: '',
      date2: '',
      time2: '',
      date3: '',
      time3: '',
      date4: '',
      time4: '',
      date5: '',
      time5: '',
    },
  })

  useEffect(() => {
    const timer = setTimeout(
      () => {
        router.reload()
      },
      5 * 60 * 1000,
    )
    return () => clearTimeout(timer)
  }, [router])

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <>
      <NextHead></NextHead>

      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={[DialogContentMain, w(90), mt(15)]}>
          <CssBaseline />
          <Box sx={[M0Auto, w(90)]}>
            <Box sx={FormBox}>
              {Array.from({ length: 5 }, (_, index) => (
                <Box key={index} sx={[mb(10)]}>
                  <Typography component="h3" variant="h5" sx={mb(2)}>
                    <b>{`・第${index + 1}希望${index > 0 ? '' : '*'}`}</b>
                  </Typography>
                  <Grid container alignItems="center" sx={[FormButtons, ml(3)]}>
                    <Box sx={[w(45), mb(2)]}>
                      <Box component="span">年月日:</Box>
                      <FormControl
                        sx={[w(40), minW(200), ml(3)]}
                        variant="outlined"
                      >
                        <Select
                          {...register(`date${index + 1}` as keyof Inputs)}
                          defaultValue=""
                        >
                          {dateOptions.map((date, dateIndex) => (
                            <MenuItem key={dateIndex} value={date}>
                              {date}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box sx={[w(45), mb(2)]}>
                      <Box component="span">時間帯:</Box>
                      <FormControl
                        sx={[w(40), minW(200), ml(3)]}
                        variant="outlined"
                      >
                        <Select
                          {...register(`time${index + 1}` as keyof Inputs)}
                          defaultValue=""
                        >
                          {timeOptions.map((time, timeIndex) => (
                            <MenuItem key={timeIndex} value={time}>
                              {time}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Box>
              ))}
            </Box>
          </Box>
        </DialogContent>

        <Button
          type="submit"
          sx={{
            mt: 2,
            bgcolor: indigo[500],
            '&:hover': { bgcolor: indigo[700] },
          }}
          variant="contained"
          color="primary"
        >
          送信
        </Button>
      </Box>
    </>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      messages: (await import(`../../public/locales/${locale}/common.json`))
        .default,
    },
  }
}

export default Applicant
