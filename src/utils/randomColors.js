/* eslint-disable no-plusplus */
import randomColor from 'randomcolor'

function shuffleArray(array) {
  const newArray = array.slice()
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

const generateRandomColors = (count) => {
  const hues = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']
  const { length } = hues
  const randomHues = shuffleArray(hues)

  const randomColors = Array.from({ length: count }, (_, p) => {
    const currentHue = randomHues[p % length]
    const newColor = randomColor({
      hue: currentHue,
      luminosity: 'bright',
      count: 1
    })[0]
    return newColor
  })

  return randomColors
}

export default generateRandomColors
