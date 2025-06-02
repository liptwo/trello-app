import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import mapOrder from '~/utils/sort'
import { DndContext,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  pointerWithin,
  // rectIntersection,
  closestCorners,
  getFirstCollision
  // closestCenter
} from '@dnd-kit/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceHolderCard } from '~/utils/fomatters'
import { MouseSensor, TouchSensor } from '~/customLibrary/dndKitSencors'


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

  const [orderColumns, setOrderColumns] = useState([])
  // một thời điểm chi có 1 card hoặc column
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  // diem va cham cuoi cung video 37
  const lastOverId = useRef(null)
  useEffect(() => {
    setOrderColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  // di chuyen card giua cac column khac nhau
  const dragCardOverDiffentColumn = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderColumns(prevColumns => {
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
        // fix empty columncolumn
        if (isEmpty(nextActiveColumn.cards)) {
          // console.log('card cuối cùng bị kéo đi')
          nextActiveColumn.cards = [generatePlaceHolderCard(nextActiveColumn)]
        }
        // cap nhap lai mang cardid
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      if ( nextOverColumn ) {
        // kiem trang xem card dang keo co ton tai trong overcolumn chua
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //  them card dang keo vao overcolumn

        // nếu sử dụng activeDraggingCardData để xét if ngoài cùng thì sẽ cố lỗi và sẽ fix như sau
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          { ...activeDraggingCardData,
            columnId: nextOverColumn._id }
        )
        // xóa PlaceHolder card
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)
        // cap nhap lai mang cardId cot over
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        // console.log(nextOverColumn)
      }

      return nextColumns
    })
  }
  //find column by cardId
  const findColumnByCardId = ( cardId ) => {
    return orderColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD:ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
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
      dragCardOverDiffentColumn(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }


  }

  function handleDragEnd( event ) {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event
    // not exits return
    if (!active || !over) return

    //  xu ly keo tha card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // console.log('handleDragOver: ', event)

      // card is dragging0
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      // card is over
      const { id: overCardId } = over
      // find 2 column dnd
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      // neu khong ton tai 1 trong hai column tranh cash
      if ( !activeColumn || !overColumn) return
      // keo tha card giua 2 column khac nhau
      // console.log('activeDraggingCardData', activeDragItemData)

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {

        // console.log('Hành động kéo thả card giữa 2 column khac nhau')
        dragCardOverDiffentColumn(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        // console.log('Hanh động kéo thả card cùng 1 column')
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(column => column._id === overCardId)
        // arraymove sort aray
        // same when boardcontent
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }

    // xu ly keo tha column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      // console.log('drag and drop column, current do nothing')
      const oldColumnIndex = orderColumns.findIndex(c => c._id === active.id)
      const newColumnIndex = orderColumns.findIndex(c => c._id === over.id)
      // arraymove sort aray
      const dndOrderedColumns = arrayMove(orderColumns, oldColumnIndex, newColumnIndex)
      // use later when call api
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      setOrderColumns(dndOrderedColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
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

  // custom thuật toán phát hiện va chạm để fix bug
  const collisionDectectionStratery = useCallback((args) => {
    // console.log('handleStratery')
    // thuat toan ap dung cho khi keo column thi dung closestCornersCorners
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }
    const pointerInterSections = pointerWithin(args)

    // fix lỗi kéo card
    if (!pointerInterSections?.length) return

    // const interSections = !!pointerInterSections?.length ?
    //   pointerInterSections :
    //   rectIntersection(args)

    let overId = getFirstCollision(pointerInterSections, 'id')
    // console.log(overId)
    if (overId) {

      const checkColumn = orderColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCorners({
          ...args,
          droppableContainers: args.droppableContainers.filter( container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }
      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderColumns])

  return (
    <DndContext
      // phat hien va cham phan tu lon
      // collisionDetection={closestCorners}
      collisionDetection={collisionDectectionStratery}
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
