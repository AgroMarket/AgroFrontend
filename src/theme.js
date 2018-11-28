import {createMuiTheme} from '@material-ui/core/styles';

// TODO Сделать адаптив для меньшего разрешения экрана, разобраться с @media, чтобы в хидере меню было 18px
// Тема для Material-UI
let theme = createMuiTheme({
  // Точки переход разрешения
  breakpoints: {
    keys:
      [
        {
          0: 'xs',
        },
        {
          1: 'sm',
        },
        {
          2: 'md',
        },
        {
          3: 'lg',
        },
        {
          4: 'xl',
        },
      ],
    values: {
      'xs': 0,
      'sm': 960,
      'md': 1280,
      'lg': 1440,
      'xl': 1920,
    },
  },
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
      dark: '#00a000',
      contrastText: '#fff',
    },
    // для второстепенных элементов интерфейса
    secondary: {
      light: '#ff7961',
      main: '#40732c',
      dark: '#008b00',
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
});

export default theme = {
  ...theme,
  // Настройка внешнего вида компонентов
  overrides: {
    // Название компонента
    MuiTabs: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        paddingTop: 22,
        color: '#558b2f',
        minHeight: 90,
        [theme.breakpoints.down('lg')]: {
          paddingTop: 18,
        },
      },
    },
    MuiTab: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        fontWeight: 'normal',
        textTransform: 'none',
        [theme.breakpoints.down('xl')]: {
          fontSize: 18,
          minWidth: 80,
        },
        [theme.breakpoints.down('lg')]: {
          fontSize: 13,
        },
        [theme.breakpoints.down('md')]: {
          fontSize: 12,
          minWidth: 60,
        },
      },
      labelContainer: {
        [theme.breakpoints.down('xl')]: {
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
      labelWrapped: {
        [theme.breakpoints.down('xl')]: {
          fontSize: 18,
          minWidth: 80,
        },
        [theme.breakpoints.down('lg')]: {
          fontSize: 13,
        },
        [theme.breakpoints.down('md')]: {
          fontSize: 12,
          minWidth: 60,
        },
      },
    },
    MuiButton: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        fontWeight: 'normal',
        textTransform: 'none',
        [theme.breakpoints.down('xl')]: {
          fontSize: 18,
        },
        [theme.breakpoints.down('lg')]: {
          fontSize: 13,
        },

        [theme.breakpoints.down('md')]: {
          fontSize: 12,
        },
      },
    },
    MuiList: {
      // Название правила
      root: {
        // Изменяем значения CSS для компонента
        backgroundColor: '#fff',
        [theme.breakpoints.down('xl')]: {
          width: 340,
        },
        [theme.breakpoints.down('lg')]: {
          width: 238,
        },
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
      gutters: {
        [theme.breakpoints.down('xl')]: {
          paddingLeft: 32,
        },
        [theme.breakpoints.down('lg')]: {
          paddingLeft: 16,
        },
      },
    },
    MuiListItemText: {
      // Название правила
      primary: {
        // Изменяем значения CSS для компонента
        lineHeight: 1,
        [theme.breakpoints.down('xl')]: {
          fontSize: 18,
          paddingLeft: 50,
        },
        [theme.breakpoints.down('lg')]: {
          fontSize: 14,
          paddingLeft: 30,
        },
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
        [theme.breakpoints.down('xl')]: {
          paddingLeft: 24,
          paddingRight: 24,
        },
        [theme.breakpoints.down('lg')]: {
          paddingLeft: 12,
          paddingRight: 12,
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        backgroundColor: '#558b2f',
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
};