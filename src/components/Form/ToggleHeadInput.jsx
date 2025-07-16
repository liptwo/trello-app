import { Box, TextField } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'

const MAX_TITLE = 30

const ToggleHeadInput = ({ headTitle, onChangedValue, inputFontSize = '1.1rem', ...props }) => {
  const headRef = useRef(null)
  const [draft, setDraft] = useState(headTitle || '')
  const [title, setTitle] = useState(headTitle || '')

  // Sync with external prop changes
  useEffect(() => {
    setTitle(headTitle || '')
    setDraft(headTitle || '')
  }, [headTitle])

  const handleSetDraft = (e) => {
    if (e.target.value.length <= MAX_TITLE) {
      setDraft(e.target.value)
    }
  }

  const handleSave = useCallback(() => {
    // lưu khi khác hoặc khi có giá trị
    if (draft !== title && draft.trim() !== '') {
      const newTitle = draft.trim()
      setTitle(newTitle)
      setDraft(newTitle)
      onChangedValue(newTitle)
    } else {
      setDraft(title)
    }
  }, [draft, title, onChangedValue])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      headRef.current?.blur() // Trigger onBlur which calls handleSave
    } else if (e.key === 'Escape') {
      setDraft(title) // Revert to last saved title
      headRef.current?.blur() // Also lose focus
    }
  }

  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <TextField
        inputRef={headRef}
        data-no-dnd='true'
        fullWidth
        size='small'
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        value={draft}
        onChange={handleSetDraft}
        autoComplete='off'
        variant='outlined'
        {...props}
        InputProps={{
          sx: {
            pr: '1px',
            fontSize: inputFontSize,
            fontWeight: 'bold',
            color: (theme) => (theme.palette.mode === 'dark' ? 'white' : 'black')
          }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '4px',
            '& fieldset': {
              borderColor: 'transparent' // 🧊 Initially no border
            },
            '&:hover fieldset': {
              borderColor: 'transparent' // 🧊 No change on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976d2' // 🎯 Show border only on focus
            }
          },
          '& .MuiInputBase-input': {
            padding: '10px 8px'
          },
          '&:hover .MuiFormHelperText-root': {
            display: 'flex'
          }

        }}
        FormHelperTextProps={{
          sx: {
            position: 'absolute',
            right: 0,
            bottom: '10px',
            display: 'none'
            // '&: hover': {
            //   display: 'flex'
            // }

          }
        }}
      />
    </Box>
  )
}

export default ToggleHeadInput