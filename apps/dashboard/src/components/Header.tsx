import Link from 'next/link';
import ThemeSwitcher from '../components/ThemeSwitcher';
import AuthButton from './AuthButton.server';

const NavigationList = () => {
  return (
    <ul className="flex gap-6 flex-row">
      <li>
        <Link href="/purchases">Licenses</Link>
      </li>
    </ul>
  );
};

const Header = () => {
  return (
    <header className="py-6">
      <nav className="container flex items-center justify-between">
        <NavigationList />
        <div className="flex gap-4"> {/* Added a div for better spacing */}
          <ThemeSwitcher />
          <AuthButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
