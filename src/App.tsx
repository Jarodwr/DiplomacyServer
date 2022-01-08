import './App.css';
import { GameMap } from './GameMap';
import { Frame } from './Frame';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme({ palette: { mode: 'dark' } })

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Frame>
          <GameMap />
        </Frame>
    </ThemeProvider>
  );
}

export default App;
