import Link from 'next/link';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Logout from './Logout';
import { getSession } from "@/lib/getSession";






const NavigationList = () => {
  return (
    <ul className="flex gap-6 flex-row">
      <li>
        <Link href="/purchases">Licenses</Link>
      </li>
    </ul>
  );
};

const Header = async() => {
  const session = await getSession();
  const user = session?.user;
  return (
    <header className="py-6">
      <nav className="container flex items-center justify-between">
        <NavigationList />
        <div className="flex gap-4"> {/* Added a div for better spacing */}
          <ThemeSwitcher />
          {user && (
            <Logout />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
