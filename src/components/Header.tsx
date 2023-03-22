import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="bg-black text-white pt-6 md:py-6">
      <div className="container md:flex md:items-center md:justify-between mx-auto px-4">
        <h1 className="mb-4 md:mb-0 text-2xl">Emotunes</h1>
        <ul className="md:flex md:items-center list-reset text-xl">
          <li className="border-t md:border-0 md:ml-4">
            <a className="block md:inline no-underline py-4 md:py-0 text-white hover:text-gray-300" href="/">
              Theme
            </a>
          </li>
          <li className="border-t md:border-0 md:ml-4">
            <a className="block md:inline no-underline py-4 md:py-0 text-white hover:text-gray-300" href="/">
              Collaborators
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
