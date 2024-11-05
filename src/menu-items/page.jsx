
import AnalyticsIcon from 'assets/images/icons/NavIcons/AnalyticsIcon';
import ClaimsIcon from 'assets/images/icons/NavIcons/ClaimsIcon';
import DocumentIcon from 'assets/images/icons/NavIcons/DocumentIcon';
import HelpIcon from 'assets/images/icons/NavIcons/HelpIcon';
import InsuranceIcon from 'assets/images/icons/NavIcons/InsuranceIcon';
import PaymentIcon from 'assets/images/icons/NavIcons/PaymentIcon';
import PropertyIcon from 'assets/images/icons/NavIcons/PropertyIcon';
import SettingsIcon from 'assets/images/icons/NavIcons/SettingsIcon';
// icons
const icons = {
  SettingsIcon,
  AnalyticsIcon,
  InsuranceIcon,
  PropertyIcon,
  ClaimsIcon,
  HelpIcon,
  PaymentIcon,
  DocumentIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'pages',
  title: 'pages',
  type: 'group',
  children:
    [
      {
        id: 'property',
        title: 'Property',
        url: '/property',
        icon: icons.PropertyIcon,

        type: "item",

      },
      {
        id: 'insurance',
        title: 'Insurance',
        type: 'item',
        url: '/insurance',
        icon: icons.InsuranceIcon,
      },
      {
        id: 'claims-management',
        title: 'Claims Management',
        url: '/claims-management',
        type: "item",
        icon: icons.ClaimsIcon,
      },
      {
        id: 'documents-repository',
        title: 'Documents Repository',
        url: '/documents-repository',
        type: "item",
        icon: icons.DocumentIcon,
      },
      {
        id: 'payments',
        title: 'Payments',
        url: '/payments',
        icon: icons.PaymentIcon,
        type: "item",

        badge: 2
      },
      {
        id: 'analytics',
        title: 'Analytics',
        url: '/analytics',
        icon: icons.AnalyticsIcon,
        type: "item",
      },
      {
        id: 'settings',
        title: 'Settings',
        url: '/settings',
        icon: icons.SettingsIcon,
        type: "item",
        target: true
      },
      {
        id: 'help-support',
        title: 'Help & Support',
        url: '/help-support',
        icon: icons.HelpIcon,
        type: "item",
        target: true
      }

    ]
};

export default pages;
