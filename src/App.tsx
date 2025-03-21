import "./App.css"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import MuiTabs from "./Tabs"

function App() {          
  return (
    <Container maxWidth="md" sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">My Todos</Typography>
        </Toolbar>
      </AppBar>
      <MuiTabs />
    </Container>
  )
}

export default App
