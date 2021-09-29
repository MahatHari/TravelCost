import React from 'react';
import '../../node_modules/material-design-icons/iconfont/material-icons.css';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
// Due to deprication warning, change when Material UI Core V5 is released!
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersOverrides } from '@material-ui/pickers/typings/overrides';

type overridesNameToClassKey = {
  [P in keyof MuiPickersOverrides]: keyof MuiPickersOverrides[P];
};
 /* eslint-disable */
declare module '@material-ui/core/styles/overrides' {
  export interface ComponentNameToClassKey extends overridesNameToClassKey {}
}
const blue_100 = '#ebf8ff';
const blue_200 = '#bee3f8';
const blue_300 = '#90cdf4';
const blue_400 = '#63b3ed';
const blue_500 = '#4299e1';
const blue_600 = '#3182ce';
const blue_700 = '#2b6cb0';
const blue_800 = '#2c5282';
const blue_900 = '#2a4365';

const materialTheme = createMuiTheme({

  palette: {
    primary: {
      light:blue_500, //#bee3f8
      main: blue_700, //#4299e1
      dark: blue_900, //#2a4365
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    //This wont work as it messe up the callender header
    //htmlFontSize: 12,
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: blue_500,
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
          // backgroundColor: blue_200,
          // color: 'white',
      },
    },
    MuiPickersDay: {
      day: {
        color: blue_700,
      },
      daySelected: {
        backgroundColor: blue_500,
      },
      dayDisabled: {
        color: blue_200,
      },
      current: {
        color: blue_900,
      },
    },
    MuiPickersModal: {
      // dialogAction: {
      //   color:  '#000',
      // },
    },
  },
});

interface IDateTime {
  dt: {
    dateTime: Date | null;
    setDateTime: React.Dispatch<React.SetStateAction<Date | null>>;
  }
}

//https://material-ui-pickers.dev/getting-started/installation
const DateTime: React.FC<IDateTime> = (props: IDateTime) => {
  // const [selectedDate, handleDateChange] = useState<Date | null>(new Date());
  const selectedDate = props.dt.dateTime;
  const handleDateChange = props.dt.setDateTime;

  return (
    <>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <DateTimePicker
              label='Time of departure'
              value={selectedDate}
              onChange={newDate => handleDateChange(newDate)}
              ampm={false}
              disablePast={true}
              fullWidth={true}
              //format='string'  
             // dateRangeIcon={React.createElement('span', {className:'material-icons'}, 'schedule')}
              />
            </ThemeProvider>
        </MuiPickersUtilsProvider>
    </>
  )
}

export default DateTime;