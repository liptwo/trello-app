export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

// fix empty column
export const generatePlaceHolderCard = ( column ) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boaerdId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}