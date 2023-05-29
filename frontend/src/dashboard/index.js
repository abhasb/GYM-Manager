import React ,{ useState, useEffect} from 'react';
import SideNavBar from '../dashboard/components/sidenav'
import { Container, Header, Content, Sidebar, Button } from 'rsuite';
import CustomHeader from './components/header';
import ActiveMembers from '../members/activeMembers';
import InactiveMembers from '../members/inactiveMembers';

const GymDashboard = () => {
    const [activeMembersOpen, setActiveMembersOpen] = useState(true)
    const [refreshed, setRefreshed] = useState(false)

    const handleRefresh = () => {
        setRefreshed(!refreshed)
    }

    return (
        <Container>
            <Content>
                <Header style={{
                height: 65, 
                display: "flex", 
                background: "#3E8CFE",
                justifyContent: "space-between"
                }}>
                    <CustomHeader/>
                    <Button appearance="default" onClick={handleRefresh} style={{height: 40, marginTop: 13, marginRight: 40}}>Refresh</Button>
                </Header>
                <Container>
                    <Sidebar><SideNavBar setActiveMembersOpen={setActiveMembersOpen} setRefreshed={setRefreshed} refreshed={refreshed}/></Sidebar>
                    <Content style={{}}>
                        {activeMembersOpen ? <ActiveMembers refreshed={refreshed} setRefreshed={setRefreshed} /> :
                                            <InactiveMembers refreshed={refreshed} setRefreshed={setRefreshed} />}
                    </Content>
                </Container>
            </Content>
        </Container>
        
    );
}

export default GymDashboard;