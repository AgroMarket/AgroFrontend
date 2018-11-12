import {createMuiTheme} from '@material-ui/core/styles';

// TODO Сделать адаптив для меньшего разрешения экрана, разобраться с @media, чтобы в хидере меню было 18px
// Тема для Material-UI
export const theme = createMuiTheme({
  // Набор цветов (оттенки и их тени)
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    // для основных элементов интерфейса
    primary: {
      light: '#757ce8',
      main: '#558b2f',
      dark: '#008b00',
      contrastText: '#fff',
    },
    // для второстепенных элементов интерфейса
    secondary: {
      light: '#ff7961',
      main: '#008b00',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
      light: '#e57373',
      main: '#f44336',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)',
    },
    background: {
      paper: '#fff',
      // цвет фона по умолчанию
      default: '#f9fbe7',
    },
    action: {
      active: '#eeff41',
      hover: '#f0f4c3',
      selected: '#eeff41',
      //disabled: '#fff',
      //disabledBackground: '#fff',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
    ],
    // Размер шрифта по умолчанию
    fontSize: 18,
    useNextVariants: true,
  },
  // Настройка внешнего вида компонентов
  overrides: {
    // Название компонента
    MuiTabs: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        paddingTop: 8,
        color: '#558b2f',
        minHeight: 90,
      },
      indicator: {
        backgroundColor: '#fff',
      },
    },
    MuiTab: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        fontWeight: 'normal',
        textTransform: 'none',
        minWidth: 250,
      },
    },
    MuiButton: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        fontWeight: 'normal',
        textTransform: 'none',
      },
    },
    MuiList: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        backgroundColor: '#fff',
        width: 340,
      },
      padding: {
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
    MuiListItem: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        minHeight: 50,
        paddingTop: 7,
        paddingBottom: 7,
      },
    },
    MuiListItemText: {
      // Название правила
      primary: {
        // Изменяем значения CSS для компонента
        lineHeight: 1,
        paddingLeft: 50,
      },
    },
    MuiDivider: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        backgroundColor: '#919191',
      },
    },
    MuiCardContent: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        paddingTop: 0,
        paddingBottom: 0,
      },
    },
  },
  // Применени свойств для всех компонентов
  props: {
    // Название компонента
    MuiButtonBase: {
      // Изменяем свойства компонента
      // Включение ripple-эффекта для всего приложения
      disableRipple: false,
    },
  },
});