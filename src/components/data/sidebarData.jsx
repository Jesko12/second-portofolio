import * as RiIcons from "react-icons/ri";
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";



export const sidebarData = [
  {
    title: "Marketplace",
    path: "#",
    icon: <AiIcons.AiOutlineShop />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Users",
        path: "/marketplace/users",
        icon: <BiIcons.BiUser />,
      },
      {
        title: "Products",
        path: "/marketplace/products/" ,
        icon: <RiIcons.RiShoppingBasket2Line />,
      },
      {
        title: "Discover",
        path: "/marketplace/discovers/" ,
        icon: <RiIcons.RiCompassDiscoverLine />,
      },
      {
        title: "Orders",
        path: "/marketplace/orders/" ,
        icon: <RiIcons.RiTruckLine />,
      },
    ],
  },
];
