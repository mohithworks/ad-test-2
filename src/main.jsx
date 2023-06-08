import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Header from './components/Header.jsx'
import Register from './components/Register.jsx'

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
}

const customTheme = extendTheme({
  styles: {
    global: {
      body: {
        h: 'auto',
        w: 'auto',
        borderRadius: 20,
        p: 0,
        m: 0,
      },
    },
  }, 
  colors: {
    indigo: {
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      600: "#2563eb",
    },
    green: {
      100: "#f0fff4",
      // ...
      600: "#0EBF29",
    }
  },
}, config);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <ChakraProvider theme={customTheme}> 
      <Header />
      <App />
    </ChakraProvider>
  </>,
)
