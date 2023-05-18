/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useMemo } from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { useDownload, useChartActions } from '../../../store/chartStore'
import pieOptions from '../../../constants/pieOptions'
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

export default function Radios({ answers, index, filter }) {
  const chartRef = useRef(null)

  const download = useDownload()
  const { addImage } = useChartActions()

  const answersArr = answers.flat()
  const map = answersArr.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  )
  const keys = [...map.keys()]
  const values = [...map.values()]

  const colors = useMemo(
    () => generateRandomColors(keys.length),
    [keys.length, filter]
  )

  const data = {
    labels: keys,
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
      addImage({ index, data: getBase64Image() })
    }
  }, [download])

  return (
    <Grid container>
      <Grid item xs={12} md={1} lg={1} />
      <Grid item xs={12} md={10} lg={10}>
        <Box sx={{ p: 0, mb: 0 }}>
          <Pie
            ref={chartRef}
            data={data}
            options={pieOptions}
            plugins={[plugin]}
          />
        </Box>
      </Grid>
    </Grid>
  )
}
