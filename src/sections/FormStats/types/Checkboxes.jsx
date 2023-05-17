/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useDownload, useChartActions } from '../../../store/chartStore'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

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

const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false
    },
    customCanvasBackgroundColor: {
      color: 'white'
    }
  }
}

export default function Checkboxes({ subQuestions, answers, index }) {
  const chartRef = useRef(null)

  const download = useDownload()
  const { addImage } = useChartActions()

  const total = answers.length
  const answersArr = answers.flat()

  const answersCounter = answersArr.reduce((acc, elemento) => {
    acc[elemento] = (acc[elemento] || 0) + 1
    return acc
  }, {})

  const yesData = subQuestions.map((element) => {
    if (element in answersCounter) {
      return answersCounter[element]
    }
    return 0
  })
  const noData = yesData.map((element) => {
    return total - element
  })

  const data = {
    labels: subQuestions,
    datasets: [
      {
        label: 'No',
        data: noData,
        backgroundColor: 'rgba(255, 51, 97, 0.8)',
        borderWidth: 1
      },
      {
        label: 'Sí',
        data: yesData,
        backgroundColor: 'rgba(28, 176, 100, 0.8)',
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
      addImage({ index, data: getBase64Image() })
    }
  }, [download])

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={10} lg={12}>
        <Box sx={{ pt: 0, px: 2, mb: 1 }}>
          <Bar
            ref={chartRef}
            data={data}
            options={options}
            plugins={[plugin]}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
