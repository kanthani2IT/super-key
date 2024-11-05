// assets
import HomeIcon from 'assets/images/icons/NavIcons/HomeIcon';

// icons
const icons = {
  HomeIcon
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  title: 'Navigation',
  type: 'group',
  children: [
    {
      id: 'home',
      title: 'Home',
      type: 'item',
      url: '/home',
      icon: icons.HomeIcon,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
