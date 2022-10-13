import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import EventTwoToneIcon from '@mui/icons-material/EventTwoTone';
import EmojiFoodBeverageTwoToneIcon from '@mui/icons-material/EmojiFoodBeverageTwoTone';
import NightlifeTwoToneIcon from '@mui/icons-material/NightlifeTwoTone';
import AddLocationTwoToneIcon from '@mui/icons-material/AddLocationTwoTone';
import CatchingPokemonTwoToneIcon from '@mui/icons-material/CatchingPokemonTwoTone';
import FaceRetouchingNaturalTwoToneIcon from '@mui/icons-material/FaceRetouchingNaturalTwoTone';
import SentimentVerySatisfiedTwoToneIcon from '@mui/icons-material/SentimentVerySatisfiedTwoTone';
import QueueMusicTwoToneIcon from '@mui/icons-material/QueueMusicTwoTone';
import TheaterComedyTwoToneIcon from '@mui/icons-material/TheaterComedyTwoTone';
import FormatListNumberedTwoToneIcon from '@mui/icons-material/FormatListNumberedTwoTone';
import FloodTwoToneIcon from '@mui/icons-material/FloodTwoTone';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import BabyChangingStationTwoToneIcon from '@mui/icons-material/BabyChangingStationTwoTone';
import BathtubTwoToneIcon from '@mui/icons-material/BathtubTwoTone';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import CurrencyExchangeTwoToneIcon from '@mui/icons-material/CurrencyExchangeTwoTone';
import LoyaltyTwoToneIcon from '@mui/icons-material/LoyaltyTwoTone';
import LinearScaleTwoToneIcon from '@mui/icons-material/LinearScaleTwoTone';

export interface MenuItem {
  link: string;
  icon?: OverridableComponent<SvgIconTypeMap<any>> & { muiName: string };
  badge?: string;
  items?: MenuItem[];
  name: string;
  handler?: (props?: unknown) => unknown;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Главная страница',
    items: [
      {
        name: 'Слайдер',
        link: '/main/slider',
        icon: LinearScaleTwoToneIcon,
      },
    ],
  },
  {
    heading: 'События',
    items: [
      {
        name: 'События',
        link: '/events',
        icon: EventTwoToneIcon,
        badge: '2',
      },
      {
        name: 'Добавить событие',
        link: '/events/create',
        icon: EmojiFoodBeverageTwoToneIcon,
      },
      {
        name: 'Классификация',
        link: '/events/terms',
        items: [
          {
            name: 'Категории',
            link: '/events/terms/category',
            icon: TheaterComedyTwoToneIcon,
          },
          {
            name: 'Жанры',
            link: '/events/terms/genre',
            icon: QueueMusicTwoToneIcon,
          },
          {
            name: 'Настроения',
            link: '/events/terms/feeling',
            icon: SentimentVerySatisfiedTwoToneIcon,
          },
          {
            name: 'Подборки',
            link: '/events/terms/selection',
            icon: FormatListNumberedTwoToneIcon,
          },
        ],
      },
    ],
  },
  {
    heading: 'Скидки и купоны',
    items: [
      {
        name: 'Скидки',
        link: '/coupons',
        icon: CurrencyExchangeTwoToneIcon,
      },
      {
        name: 'Добавить купон',
        link: '/coupons/create',
        icon: LoyaltyTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Площадки',
    items: [
      {
        name: 'Площадки',
        link: '/items',
        icon: NightlifeTwoToneIcon,
      },
      {
        name: 'Добавить место',
        link: '/items/create',
        icon: AddLocationTwoToneIcon,
      },
      {
        name: 'Типы площадок',
        link: '/items/terms/types',
        icon: FloodTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Артисты',
    items: [
      {
        name: 'Артисты',
        link: '/artists',
        icon: CatchingPokemonTwoToneIcon,
      },
      {
        name: 'Добавить нового',
        link: '/artists/create',
        icon: FaceRetouchingNaturalTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Организаторы',
    items: [
      {
        name: 'Организаторы',
        link: '/organizers',
        icon: CorporateFareTwoToneIcon,
      },
      {
        name: 'Добавить нового',
        link: '/organizers/create',
        icon: SupervisedUserCircleTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Пользователи',
    items: [
      {
        name: 'Пользователи',
        link: '/users',
        icon: BabyChangingStationTwoToneIcon,
      },
      {
        name: 'Добавить нового',
        link: '/users/create',
        icon: BathtubTwoToneIcon,
      },
    ],
  },
];

export default menuItems;
