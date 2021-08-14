import { Button, } from '@material-ui/core';
import { LeftSideBar } from 'components/LeftSideBar';
import { TopFilter } from 'components/TopFilter';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { topFilterType, userType } from 'shared/constants';
import { RootState } from 'store/store';
import { MemberList } from 'components/members/Invite';
import { AddMembers } from 'components/members/AddMembers';

interface RouteParams { id: string; }

interface Props extends RouteComponentProps<RouteParams> {

}

export const ManageMembers: React.FC<Props> = () => {
  const { projectData } = useSelector((state: RootState) => state.currentProject);
  const [showMenu, setShowMenu] = useState(false);

  const [activeUsers, setActiveUsers] = useState(userType.MEMBER);

  const toggleUsersActive = (userType: string) => {
    if (userType === activeUsers) return;
    setActiveUsers(userType);
  };

  return (
    <>
      <LeftSideBar showMenu={showMenu} onCloseMenu={() => setShowMenu(false)} />
      <div className='flex flex-col flex-grow'>
        <div className='flex flex-col w-full flex-1'>
          <TopFilter onOpenMenu={() => setShowMenu(!showMenu)} title='Invite' type={topFilterType.INVITE} />
          <div className='flex flex-col p-5 pl-10 flex-1'>
            <div>
              <h2 className='font-semibold text-xl mb-2'>Project Title: {projectData.project.title}</h2>
            </div>
            <h2 className='text-md'>Manage Members</h2>
            <div className='flex items-center my-4'>
              <Button className='w-6/12' color='primary' variant={activeUsers === userType.MEMBER ? 'contained' : 'outlined'} onClick={() => toggleUsersActive(userType.MEMBER)}>Members</Button>
              <Button className='w-6/12' color='primary' variant={activeUsers === userType.USER ? 'contained' : 'outlined'} onClick={() => toggleUsersActive(userType.USER)}>Invite</Button>
            </div>
            {activeUsers === userType.MEMBER && <MemberList />}
            {activeUsers === userType.USER && <AddMembers />}
          </div>
        </div>
      </div>
    </>
  );
};
