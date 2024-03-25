import { MenuNode } from 'src/_entities/menuNode';

export const TreeData: MenuNode[] = [
  {
    name: 'مدیریت سامانه',
    url: 'SystemManagement',
    icon: 'setting',
    singlePathName: 'systemmanagement',
    availableForPermisions: ['Admin_View'],
    children: [
      /*  { name: 'تنظیمات', url: 'SystemManagement/Setting', icon: "settings" },*/
      {
        name: 'طرح ها',
        url: 'SystemManagement/Plan',
        icon: 'summarize',
        availableForPermisions: ['Admin_View'],
      },
      {
        name: 'وثایق',
        url: 'SystemManagement/GuaranteeType',
        icon: 'money',
        availableForPermisions: ['Admin_View'],
      },
      //{
      //name: 'فایل های طرح ها',
      //url: 'SystemManagement/PlansFiles',
      //icon: "menu_book",
      //availableForPermisions: ['Admin_View']
      //},
      {
        name: 'قرارداد طرح',
        url: 'SystemManagement/PlanContract',
        icon: 'note_alt',
        availableForPermisions: ['Admin_View'],
      },
      //{
      //name: 'پارامترهای قراداد',
      //url: 'SystemManagement/ContractParameters',
      //icon: "checklist",
      //availableForPermisions: ['Admin_View']
      //},
      {
        name: 'قراداد',
        url: 'SystemManagement/contract',
        icon: 'draw',
        availableForPermisions: ['Admin_View'],
      },
      {
        name: 'شعب طرح ها',
        url: '/SystemManagement/PlanBranch',
        icon: 'account_balance',
        availableForPermisions: ['Admin_View'],
      },
      {
        name: 'نوع تسهیلات',
        url: 'SystemManagement/FacilityType',
        icon: 'card_giftcard',
        availableForPermisions: ['Admin_View'],
      },
      {
        name: 'تسهیلات',
        url: 'SystemManagement/Facility',
        icon: 'credit_card',
        availableForPermisions: ['Admin_View'],
      },
      {
        name: 'مدارک',
        url: 'SystemManagement/DeclaredDocument',
        icon: 'folder',
        availableForPermisions: ['Admin_View'],
      },
      {
        name: 'فرآیند',
        url: 'SystemManagement/Module',
        icon: 'bubble_chart',
        availableForPermisions: ['Admin_View'],
      },
    ],
  },
  {
    name: 'کارتابل',
    url: 'Reports/Reports',
    icon: '',
    singlePathName: 'Reports',
    availableForPermisions: ['Admin_View', 'BranchAcess', 'NetworkAccess'],
  },
  {
    name: 'مشخصات مشتری',
    url: 'Cartable',
    icon: 'setting',
    singlePathName: 'cartable',
    availableForPermisions: ['Admin_View'],
    children: [
      {
        name: 'ثبت نامی ها ',
        url: 'Cartable/IndividualCustomer',
        icon: 'person_add',
        availableForPermisions: ['Admin_View'],
      },
    ],
  },
  {
    name: 'راهنمای سامانه',
    url: '/Help',
    icon: '',
    singlePathName: 'Help',
    availableForPermisions: ['Admin_View', 'BranchAcess', 'NetworkAccess'],
  },
  //{
  //    name: 'حساب کاربری',
  //    url: '/User/Account',
  //    icon: "user",
  //    singlePathName: "account",
  //    children: [
  //        { name: 'خروج', url: '/User/Logout', icon: "logout" },
  //    ]
  //}
];
