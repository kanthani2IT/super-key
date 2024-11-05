// assets
import { HomeOutlined } from '@ant-design/icons';
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
      id: 'dashboard',
      title: 'Home',
      type: 'item',
      url: '/dashboard',
      icon: icons.HomeIcon,

      breadcrumbs: false
    }
  ]
};

export default dashboard;
