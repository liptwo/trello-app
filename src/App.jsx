// App.jsx
import { useColorScheme } from '@mui/material/styles'
import { Button, Typography, Stack, Container } from '@mui/material'
// import useMediaQuery from '@mui/material/useMediaQuery'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness'
import Box from '@mui/material/Box'
import theme from './theme'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()
  const handleChange = (event) => {
    setMode(event.target.value)
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="label-select-dark-light-mode">Theme</InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        onChange={handleChange}
      >
        <MenuItem value="light">
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <LightModeIcon fontSize='small'/> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <DarkModeIcon fontSize='small'/> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display:'flex', alignItems:'center', gap:1 }}>
            <SettingsBrightnessIcon fontSize='small'/> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}
function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  // const prefersLightkMode = useMediaQuery('(prefers-color-scheme: light)')
  // console.log('prefersDarkMode', prefersDarkMode)
  // console.log('prefersLightMode', prefersLightkMode)
  return (
    <Container disableGutters maxWidth={false} sx={{height: '100vh', backgroundColor: 'primary.main' }}>
      <Box sx={{
        backgroundColor:'primary.light',
        width: '100vw',
        height: (theme) => theme.trello.headHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        <ModeSelect />
      </Box>
      <Box sx={{
        backgroundColor:'primary.dark',
        width: '100vw',
        height: (theme) => theme.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center'
      }}>
        Board Bar
      </Box>
      <Box sx={{
        backgroundColor:'primary.main',
        width: '100%',
        height: (theme) => `calc(100vh - ${theme.trello.headHeight + theme.trello.boardBarHeight}px)`,
        display: 'flex',
        alignItems: 'center'
      }}>
        Main
      </Box>
    </Container>
  )
}

export default App
