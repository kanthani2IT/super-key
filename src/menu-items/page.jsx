
import AnalyticsIcon from 'assets/images/icons/NavIcons/AnalyticsIcon';
import ClaimsIcon from 'assets/images/icons/NavIcons/ClaimsIcon';
import DocumentIcon from 'assets/images/icons/NavIcons/DocumentIcon';
import HelpIcon from 'assets/images/icons/NavIcons/HelpIcon';
import InsuranceIcon from 'assets/images/icons/NavIcons/InsuranceIcon';
import PaymentIcon from 'assets/images/icons/NavIcons/PaymentIcon';
import PropertyIcon from 'assets/images/icons/NavIcons/PropertyIcon';
import SettingsIcon from 'assets/images/icons/NavIcons/SettingsIcon';
import TaskIcon from 'assets/images/icons/NavIcons/TaskIcon';
// icons
const icons = {
  SettingsIcon,
  AnalyticsIcon,
  InsuranceIcon,
  PropertyIcon,
  ClaimsIcon,
  HelpIcon,
  PaymentIcon,
  DocumentIcon,
  TaskIcon
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const pages = {
  id: 'pages',
  title: 'pages',
  type: 'group',
  children:
    [
      {
        id: 'community',
        title: 'Community',
        url: '/community',
        icon: icons.PropertyIcon,
        showTitle: false,
        type: "collapse",
        children: [{
          id: 'communities',
          title: 'Communities',
          url: '/onboarding',
          type: "item",
        }, , {
          id: 'documents',
          title: 'Documents',
          url: '/documents',
          type: "item",
          disable: true,

        },
        {
          id: 'assets',
          title: 'Assets',
          url: '/community-assets',
          type: "item",
          disable: true,

        },
        {
          id: 'hoa',
          title: 'HOA',
          url: '/community-hoa',
          type: "item",
          disable: true,

        }]

      },
      {
        id: 'task',
        title: 'Task Management',
        url: '/tasks',
        icon: icons.TaskIcon,
        type: "item",
        disable: false,
        badge: 2
      },
      {
        id: 'documents',
        title: 'Documents',
        url: '/documents',
        icon: icons.DocumentIcon,
        type: "collapse",
        children: [{
          id: 'repository',
          title: 'Repository',
          url: '/repository',
          type: "item",
          showTitle: true,
          // icon: icons.HelpIcon,
        }, , {
          id: 'coi',
          title: 'COI',
          url: '/coi',
          type: "item",
          showTitle: true,
          // icon: icons.HelpIcon,
        },
        ]
      },
      {
        id: 'property',
        title: 'Property',
        url: '/property',
        icon: icons.PropertyIcon,
        showTitle: false,
        disable: true,
        type: "item",

      },
      {
        id: 'insurance',
        title: 'Insurance',
        type: 'item',
        url: '/insurance',
        showTitle: false,
        disable: true,
        icon: icons.InsuranceIcon,
      },
      {
        id: 'claims-management',
        title: 'Claims Management',
        url: '/claims-management',
        type: "item",
        showTitle: false,
        disable: true,
        icon: icons.ClaimsIcon,
      },


      {
        id: 'analytics',
        title: 'Analytics',
        url: '/analytics',
        disable: true,
        icon: icons.AnalyticsIcon,
        type: "item",
      },
      {
        id: 'settings',
        title: 'Settings',
        url: '/settings',
        disable: true,
        icon: icons.SettingsIcon,
        type: "item",
      },
      {
        id: 'help-support',
        title: 'Help & Support',
        url: '/help-support',
        disable: true,
        icon: icons.HelpIcon,
        type: "item",
      }

    ]
};

export default pages;
