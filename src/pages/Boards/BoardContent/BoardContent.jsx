import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import mapOrder from '~/utils/sort'
import { DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

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
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  useEffect(() => {
    setorderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragStart = (event) => {
    console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD:ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
  }
  function handleDragEnd( event ) {
    console.log('handleDragEnd: ', event)
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
    setActiveDragItemId(null)
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
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
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
