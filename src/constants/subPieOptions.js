const generateLabels = (chart) => {
  const { data } = chart
  if (data.labels.length && data.datasets.length) {
    const {
      labels: { pointStyle }
    } = chart.legend.options

    return data.labels.map((label, i) => {
      const meta = chart.getDatasetMeta(0)
      const style = meta.controller.getStyle(i)

      return {
        text: `${label} (${data.datasets[0].data[i]})`,
        fillStyle: style.backgroundColor,
        strokeStyle: style.borderColor,
        lineWidth: style.borderWidth,
        pointStyle,
        hidden: !chart.getDataVisibility(i),

        // Extra data used for toggling the correct item
        index: i
      }
    })
  }
  return []
}

const subPieOptions = {
  responsive: true,
  radius: 100,
  aspectRatio: 2.6,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        generateLabels: (chart) => generateLabels(chart)
      },
      onClick(e, legendItem, legend) {
        legend.chart.toggleDataVisibility(legendItem.index)
        legend.chart.update()
      }
    },
    customCanvasBackgroundColor: {
      color: 'white'
    }
  }
}
export default subPieOptions
