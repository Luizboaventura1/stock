export const formatValue = (value) => {
  return `R$ ${parseInt(value).toFixed(2).replace('.',',')}`
}