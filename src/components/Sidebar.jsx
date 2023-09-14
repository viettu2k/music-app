import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { logo } from '../assets';
import { links } from '../assets/constants';
import { HiOutlineMenu } from 'react-icons/hi';

const Navlinks = ({ handleClick }) => (
  <div className='mt-10'>
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className='flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400'
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className='w-6 h-6 mr-2' />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = ({ setIsLogined }) => {
  const [mobieMenuOpen, setMobieMenuOpen] = useState(false);
  return (
    <>
      <div className='md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]'>
        <img src={logo} alt='logo' className='w-full h-14 object-contain' />
        <Navlinks />
        <button
          onClick={() => setIsLogined(false)}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'
        >
          Logout
        </button>
      </div>

      <div className='absolute md:hidden block top-6 right-3'>
        {mobieMenuOpen ? (
          <RiCloseLine
            className='w-6 h-6 text-white mr-2'
            onClick={() => setMobieMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className='w-6 h-6 text-white mr-2'
            onClick={() => setMobieMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobieMenuOpen ? 'left-0' : '-left-full'
        }`}
      >
        <img src={logo} alt='logo' className='w-full h-14 object-contain' />
        <Navlinks handleClick={() => setMobieMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
