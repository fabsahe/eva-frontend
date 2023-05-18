/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useMemo } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useDownload, useChartActions } from '../../../store/chartStore'
import subPieOptions from '../../../constants/subPieOptions'
import generateRandomColors from '../../../utils/randomColors'

ChartJS.register(ArcElement, Tooltip, Legend)

const plugin = {
  id: 'customCanvasBackgroundColor',
  beforeDraw: (chart, args, options) => {
    const { ctx } = chart
    ctx.save()
    ctx.globalCompositeOperation = 'destination-over'
    ctx.fillStyle = options.color || '#99ffff'
    ctx.fillRect(0, 0, chart.width, chart.height)
    ctx.restore()
  }
}

function SubQuestion({
  sentence,
  labels,
  subAnswers,
  index,
  subIndex,
  colors
}) {
  const chartRef = useRef(null)

  const download = useDownload()
  const { addImage } = useChartActions()

  const answersCounter = subAnswers.reduce((acc, elemento) => {
    acc[elemento] = (acc[elemento] || 0) + 1
    return acc
  }, {})
  const values = labels.map((element) => {
    if (element in answersCounter) {
      return answersCounter[element]
    }
    return 0
  })

  const data = {
    labels,
    datasets: [
      {
        label: 'Respuestas',
        data: values,
        backgroundColor: colors,
        borderWidth: 1
      }
    ]
  }

  const getBase64Image = () => {
    const chartCanvas = chartRef.current.$context.chart
    const str = chartCanvas.toBase64Image('image/png', 1)
    return str
  }

  useEffect(() => {
    if (download) {
      addImage({ index, subIndex, data: getBase64Image() })
    }
  }, [download])

  return (
    <Grid item xs={12} md={12} lg={12}>
      {/* <Typography variant="body1" component="div" sx={{ textIndent: 10 }}>
        {sentence}
  </Typography> */}
      <Typography
        variant="body1"
        component="li"
        sx={{
          listStyleType: 'disc',
          marginLeft: 2 // Opcional: Ajusta el espaciado según tus necesidades
        }}
      >
        {sentence}
      </Typography>
      <Box sx={{ pt: 0, px: 4, mb: 0 }}>
        <Pie
          ref={chartRef}
          data={data}
          options={subPieOptions}
          plugins={[plugin]}
        />
      </Box>
    </Grid>
  )
}

export default function RadioGrid({
  index,
  labels,
  subQuestions,
  answers,
  filter
}) {
  const groupedAnswers = answers[0].map((_, i) => answers.map((row) => row[i]))

  const colors = useMemo(
    () => generateRandomColors(labels.length),
    [labels, filter]
  )

  return (
    <Grid container spacing={1}>
      {subQuestions.map((item, subIndex) => (
        <SubQuestion
          key={item.id}
          sentence={item.value}
          labels={labels}
          subAnswers={groupedAnswers[subIndex]}
          index={index}
          subIndex={subIndex}
          colors={colors}
        />
      ))}
    </Grid>
  )
}
