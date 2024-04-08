import { Card, ListItemPrefix, ListItem, List, ListItemSuffix, Chip } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CgProfile } from 'react-icons/cg';
import { IoSettingsOutline } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';

export const MenuProfile = () => {
  const router = useRouter();
  return (
    <Card className="w-96 h-[30rem] overflow-hidden rounded-md">
      <List className="h-full">
        <Link href="/settings">
          <ListItem className={`group rounded-none py-1.5 px-3 text-sm font-normal ${router.pathname === '/settings' ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white' : 'text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'}`}>
            <ListItemPrefix>
              <CgProfile />
            </ListItemPrefix>
            Основная информация
          </ListItem>
        </Link>
        <Link href="/main">
          <ListItem className={`group rounded-none py-1.5 px-3 text-sm font-normal ${router.pathname === '/main' ? 'bg-blue-500 text-white hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white' : 'text-blue-gray-700 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'}`}>
            <ListItemPrefix>
              <IoSettingsOutline />
            </ListItemPrefix>
            Настройки
          </ListItem>
        </Link>
        <ListItem className="rounded-none mt-auto py-1.5 px-3 text-sm font-normal text-blue-gray-700 hover:bg-red-500 hover:text-white focus:bg-red-500 focus:text-white">
          <ListItemPrefix>
            <LuLogOut />
          </ListItemPrefix>
          Выход
        </ListItem>
      </List>
    </Card>
  );
}