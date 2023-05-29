import React, { useState } from 'react';
import { Sidenav, Nav} from 'rsuite';
import GroupIcon from '@rsuite/icons/legacy/Group';
import PlusRoundIcon from '@rsuite/icons/PlusRound';
import 'rsuite/dist/rsuite.min.css';
import { Link } from 'react-router-dom';
import AddMember from '../../members/addMembers';



const SideNavBar = ({setActiveMembersOpen, setRefreshed, refreshed}) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handlePageChangeToActive = () => {
        setActiveMembersOpen(true);
    }

    const handlePageChangeToInactive = () => {
        setActiveMembersOpen(false)
    }


    return (
        <>  
            <AddMember handleClose={handleClose} setRefreshed={setRefreshed} refreshed={refreshed} open={open}/>
            <div style={{height: `calc(100vh - 65px)`}}>
                <Sidenav defaultOpenKeys={['3']}>
                    <Sidenav.Body style={{height: `calc(100vh - 65px)`}}>
                        <Nav activeKey='1'>
                            <Nav.Item eventKey='2' icon={<PlusRoundIcon/>} onClick={handleOpen}>
                                Add Member
                            </Nav.Item>
                            <Nav.Menu eventKey='3' title='Members' icon={<GroupIcon/>}>
                                <Nav.Item eventKey='3-1' style={{paddingLeft: 66}} onClick={handlePageChangeToActive} >
                                    Active 
                                </Nav.Item>
                                <Nav.Item eventKey='3-2' style={{paddingLeft: 66}} onClick={handlePageChangeToInactive}>
                                    Inactive 
                                </Nav.Item>
                            </Nav.Menu>
                        </Nav>
                    </Sidenav.Body>
                </Sidenav>
            </div>
        </>
    );
}

export default SideNavBar;


