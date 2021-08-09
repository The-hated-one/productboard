import { useAuth0 } from '@auth0/auth0-react';
import { Transition } from '@headlessui/react';
import classnames from 'classnames';
import { useClickOutside } from 'hooks/useClickOutside';
import React, { useEffect, useRef } from 'react';

interface Props {
  isOpen: boolean;
  onDismiss?: Function;
  className?: string;
}
export const ProfileMenu = ({ isOpen, className, onDismiss }: Props) => {
  let classes = classnames('select-none w-53 shadow-modal z-50 flex flex-col py-1 bg-white font-normal rounded text-gray-800', className);
  const ref = useRef(null);
  let ready = false;

  const { logout } = useAuth0();

  useClickOutside(ref, () => {

    if (ready && isOpen && onDismiss) {
      onDismiss();
    }
  });

  // Not sure why we need this? 
  useEffect(() => {
    setTimeout(() => ready = true, 300);
  });


  return (
    <div ref={ref}>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition easy-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className={classes}
        style={{ left: '-140px' }}
      >
        <div className='flex items-center h-8 px-3 hover:bg-gray-100'>View profile</div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 '>Settings</div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 '>Show keyboard shortcuts</div>
        <div className='w-full px-3 my-1 border-b border-gray-200'></div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 '>Changelog</div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 '>Join Slack Community</div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 '>Help & Support</div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 '>API</div>
        <div className='w-full px-3 my-1 border-b border-gray-200'></div>
        <div className='flex items-center h-8 px-3 hover:bg-gray-100 cursor-pointer' onClick={() => logout({
          returnTo: window.location.origin,
        })}>Logout</div>
      </Transition >
    </div>
  );
};
