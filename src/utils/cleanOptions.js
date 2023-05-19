const cleanOptions = (options) => {
  if (!Object.entries(options)[0]) {
    return options
  }

  const type = Object.entries(options)[0][0]

  if (type === 'radios') {
    const optionsArr = options.radios
    const formattedOptionsArr = optionsArr.map((option) => ({
      key: option.key,
      value: option.value.trim()
    }))
    const formattedOptions = {
      radios: formattedOptionsArr
    }
    return formattedOptions
  }

  if (type === 'dropdown') {
    const optionsArr = options.dropdown
    const formattedOptionsArr = optionsArr.map((option) => ({
      key: option.key,
      value: option.value.trim()
    }))
    const formattedOptions = {
      dropdown: formattedOptionsArr
    }
    return formattedOptions
  }

  if (type === 'checkboxes') {
    const optionsArr = options.checkboxes
    const formattedOptionsArr = optionsArr.map((option) => ({
      key: option.key,
      value: option.value.trim(),
      checked: option.checked
    }))
    const formattedOptions = {
      checkboxes: formattedOptionsArr
    }
    return formattedOptions
  }

  if (type === 'scale') {
    const optionsArr = options.labels
    const formattedLabels = optionsArr.map((label) => label.trim())
    const formattedOptions = {
      scale: options.scale,
      labels: formattedLabels
    }
    return formattedOptions
  }

  if (type === 'rows' || type === 'cols') {
    const rowsArr = options.rows
    const colsArr = options.cols

    const formattedRowsArr = rowsArr.map((row) => ({
      key: row.key,
      value: row.value.trim()
    }))
    const formattedColsArr = colsArr.map((col) => ({
      key: col.key,
      value: col.value.trim()
    }))
    const formattedOptions = {
      rows: formattedRowsArr,
      cols: formattedColsArr
    }

    return formattedOptions
  }

  return options
}

export default cleanOptions
