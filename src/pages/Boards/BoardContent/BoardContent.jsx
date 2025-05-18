import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import mapOrder from '~/utils/sort'
import { DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_CARD'
}

const BoardContent = ({ board }) => {
  // Require the mouse to move by 10 pixels before activating
  // const pointerSensors = useSensor(PointerSensor,
  //   { activationConstraint: { distance: 10 } }
  // )
  // Require the mouse to move by 10 pixels before activating
  const mouseSensors = useSensor(MouseSensor,
    { activationConstraint: { distance: 10 } }
  )
  const touchSensors = useSensor(TouchSensor,
    { activationConstraint: { delay:250, tolerance:500 } }
  )
  const sensors = useSensors( touchSensors, mouseSensors)

  const [orderColumns, setorderColumns] = useState([])
  // một thời điểm chi có 1 card hoặc column
  // const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setorderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  //find column by cardId
  const findColumnByCardId = ( cardId ) => {
    return orderColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    // setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD:ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  //trigger when drag
  const handleDragOver = (event) => {
    // do nothing when drag column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // console.log('drag and drop column, current do nothing')
      return
    }

    // console.log('handleDragOver: ', event)
    //if drag card will add process to drag card over each column
    const { active, over } = event
    if (!active || !over) return
    // card is dragging0
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // card is over
    const { id: overCardId } = over
    // find 2 column dnd
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // neu khong ton tai 1 trong hai column tranh cash
    if ( !activeColumn || !overColumn) return
    // process logic if two column different
    if (activeColumn._id !== overColumn._id) {

      setorderColumns(prevColumns => {
        // tim index cua overcard
        const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)
        // console.log('index: ', overCardIndex)

        // tinh toan vi tri index moi
        let newCardIndex
        const isBelowOverItem = active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height
        const modifier = isBelowOverItem ? 1 : 0

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if ( nextActiveColumn ) {
          // xoa card o column cu
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
          // cap nhap lai mang cardid
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }
        if ( nextOverColumn ) {
          // kiem trang xem card dang keo co ton tai trong overcolumn chua
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
          //  them card dang keo vao overcolumn
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
          // cap nhap lai mang cardId cot over
          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        return nextColumns
      })
    }


  }
  function handleDragEnd( event ) {
    // console.log('handleDragEnd: ', event)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('drag and drop card, current do nothing')
      return
    }
    const { active, over } = event
    // not exits return
    if (!over) return
    // have over
    if (active.id !== over.id) {
      const oldIndex = orderColumns.findIndex(c => c._id === active.id)
      const newIndex = orderColumns.findIndex(c => c._id === over.id)
      // arraymove sort aray
      const dndOrderedColumns = arrayMove(orderColumns, oldIndex, newIndex)
      // use later when call api
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      setorderColumns(dndOrderedColumns)
    }
    // setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
  }
  // console.log('id:', activeDragItemId)
  // console.log('type:', activeDragItemType)
  // console.log('data:', activeDragItemData)
  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles:{
        active:{
          opacity: '0.5'
        }
      }
    })
  }

  return (
    <DndContext 
      // phat hien va cham phan tu lon
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} sensors={sensors}>
      <Box sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#005485' : '#0079bf'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumns columns={ orderColumns } />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
