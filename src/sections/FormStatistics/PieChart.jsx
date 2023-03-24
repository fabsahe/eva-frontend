/* eslint-disable react/prop-types */
import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import randomColor from 'randomcolor'

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

const options = {
  plugins: {
    legend: {
      position: 'top'
    },
    customCanvasBackgroundColor: {
      color: 'white'
    }
  }
}

export default function PieChart({ raw }) {
  const rawArr = raw.map((item) => item.texto)
  const map = rawArr.reduce(
    (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
    new Map()
  )
  const keys = [...map.keys()]
  const values = [...map.values()]

  const colors = randomColor({
    count: keys.length
  })

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

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3} lg={3} />
      <Grid item xs={12} md={6} lg={6}>
        <Box sx={{ pt: 0, px: 2, mb: 1 }}>
          <Pie data={data} options={options} plugins={[plugin]} />
        </Box>
      </Grid>
    </Grid>
  )
}
