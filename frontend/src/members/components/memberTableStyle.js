import { createTheme } from '@mui/material/styles';
import { padding } from '@mui/system';
import { height } from '@mui/system';

export const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          body: {
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "Open Sans",
            padding: "8px 0 8px 0",
            color: "#3e3e3e"
          },
          head: {
            justifyContent: "center",
            textAlign: "center",
            fontFamily: "Open Sans",
            color: "GrayText"
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: 'none',
            borderRadius: '0px',
            overflow: 'auto',
            
          }
        }
      },
      MUIDataTableFilter: {
        styleOverrides:{
          root: {
            backgroundColor: "#68a6ff",
            borderRadius: "8px",
            width:  "400px"
          }
        }
      }
    }
});