import { FC } from 'react';

const Footer: FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="fixed bg-black text-white bottom-0 left-0 right-0 p-4 text-center">{`Copyright © EmoDetectives ${year}`}</footer>
  );
};

export default Footer;
