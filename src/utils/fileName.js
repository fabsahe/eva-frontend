const generateFileName = (name, suffix) => {
  const invalidCharsRegex = /[^\w\s]/gi // expresión regular que busca todos los caracteres no válidos
  const formattedTitle = name
    .toLocaleLowerCase()
    .replace('á', 'a')
    .replace('é', 'e')
    .replace('í', 'i')
    .replace('ó', 'o')
    .replace('ú', 'u')
  const fileName = formattedTitle
    .replace(invalidCharsRegex, '_')
    .replace(/\s+/g, '_')

  return `${fileName}.${suffix}`
}

export default generateFileName
