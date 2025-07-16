import { useState } from 'react'
import { useColorScheme } from '@mui/material/styles'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'


// const markdownValueExample = `
// **\`Markdown Content Example:\`**
// **Liptwo**
// <a href="https://avatars.githubusercontent.com/u/142609541?v=4" target="_blank">
//  <img src="https://avatars.githubusercontent.com/u/142609541?v=4" width="160" style="border-radius: 50%" />
// </a>

// \`\`\`javascript
// import React from "react"
// import ReactDOM from "react-dom"
// import MDEditor from '@uiw/react-md-editor'
// \`\`\`
// `

function CardDescriptionMdEditor({ description, onUpdateDescription }) {
  // Lây giá trị 'dark', 'light' hoặc 'system' mode từ MUI để support phần Markdown bên dưới:
  // data-color-mode={mode}
  // https://www.npmjs.com/package/@uiw/react-md-editor#support-dark-modenight-mode
  const { mode } = useColorScheme()
  // console.log('description: ', description)
  // State xử lý chế độ Edit và chế độ View
  const [markdownEditMode, setMarkdownEditMode] = useState(false)
  // State xử lý giá trị markdown khi chỉnh sửa
  const [cardDescription, setCardDescription] = useState(description)

  const updateCardDescription = () => {
    setMarkdownEditMode(false)
    onUpdateDescription(cardDescription)
  }
  return (
    <Box sx={{ mt: 2 }}>
      {markdownEditMode ? (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box data-color-mode={mode} sx={{ }}>
            <MDEditor
              key="editor" // 🔧 bắt buộc để remount khi đổi mode
              value={cardDescription}
              onChange={setCardDescription}
              width={400}
              previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
              height={400}
              preview="edit"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              onClick={updateCardDescription}
              variant="contained"
              size="small"
              color="info"
            >
              Save
            </Button>
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            sx={{ alignSelf: 'flex-end' }}
            onClick={() => setMarkdownEditMode(true)}
            variant="contained"
            color="info"
            size="small"
            startIcon={<EditNoteIcon />}
          >
            Edit
          </Button>
          <Box data-color-mode={mode} sx={{ }}>
            <MDEditor.Markdown
              key="preview" // 🔧 optional nếu vẫn bị lỗi
              source={cardDescription}
              style={{
                whiteSpace: 'pre-wrap',
                padding: `${cardDescription ? '16px' : '0px'}`,
                border: `${cardDescription ? '1px solid rgba(0,0,0,0.2)' : 'none'}`,
                borderRadius: '8px',
                backgroundColor: mode === 'dark' ? '#1e1e1e' : '#fafafa'
              }}
            />
          </Box>
        </Box>
      )}
    </Box>

  )
}
export default CardDescriptionMdEditor

