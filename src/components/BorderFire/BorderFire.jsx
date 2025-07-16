
import { Box } from "@mui/material"
import { Meteors } from "../magicui/meteors"
import Zoom from '@mui/material/Zoom'

export const BorderFire = ({children}) => {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0
        }}
      >
        <Meteors number={30} />
      </Box>
      <Zoom in={true} style={{ transitionDelay: '200ms' }}>
        {children}
      </Zoom>
    </>
  )
}