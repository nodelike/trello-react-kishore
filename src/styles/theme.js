import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
              main: '#040D12',
              contrastText: '#fff',
              accent: "#DCFE0B", // dark: rgb(12, 22, 25), lime: rgb(255, 103, 0)
              delete: "#555",
              deleteHover: "#F45050"
            },
            secondary: {
              main: '#0C1619',
              dark: '#000',
              border: "#555",
              contrastText: '#ffffff',
            },
            background: {
              default: '#0C1619',
              paper: "#040D12"
            },
            text: {
              primary: '#ffffff',
              secondary: '#ffffff', 
              disabled: '#ffffff',
              hint: '#ffffff',
            }
        },
        typography: {
            fontFamily: 'Poppins, sans-serif',
            h1: {
              fontSize: '1.5rem',
              fontWeight: 300,
              color: '#ffffff',
            },
            h2: {
              fontSize: '1rem',
              fontWeight: 300,
              color: '#ffffff',
            },
            button: {
              color: '#ffffff'
            }
            
        },
      });

export default theme;