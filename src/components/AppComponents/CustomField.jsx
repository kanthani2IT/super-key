import { alpha, styled, TextField } from "@mui/material";

export const BootstrapInput = styled(TextField)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: '#F3F6F9',
      border: '1px solid',
      borderColor: '#E0E3E7',
      fontSize: 16,
    //   width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
      ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
        borderColor: '#2D3843',
      }),
    },
  }));



  export const getStatus = (params) => {
    if (!params || params.status === undefined) {
      return null;
    }
  
    const { status } = params;
  
    const getColor = () => {
      switch (status) {
        case 0:
          return '#FF8255';
        case 1:
          return '#4AA785';
        default:
          return 'gray';
      }
    };
  
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: getColor(),
            marginRight: 8,
          }}
        ></span>
        <span style={{ color: getColor() }}>
          {status === 1 ? 'Active' : 'Inactive'}
        </span>
      </div>
    );
  };
  