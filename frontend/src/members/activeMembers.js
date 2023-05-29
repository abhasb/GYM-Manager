import { Button ,Loader } from 'rsuite';
import {useEffect, useState} from 'react';
import axios from '../axiosConfig';
import UpdateMember from './updateMember';
import EditNoteIcon from '@mui/icons-material/EditNote';
import MemberTable from './components/memberTable.js';



const ActiveMembers = ({refreshed, setRefreshed}) => {
    
    
    const today = new Date();
    const [data, setData] = useState([]);

    const [currentRowData, setCurrentRowData] = useState({})
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const [loaderOpen, setLoaderOpen] = useState(false)


    const columns = [
        {
            name: "",
            lable: "",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        tableMeta?.tableData?.[tableMeta?.rowIndex]?.remarks?.trim() !== ''?
                        <EditNoteIcon/>:
                        <></>
                    )
                }
            }
        },
        {
            name: "name",
            label: "Name",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "mobile",
            label: "Mobile",
            options: {
                filter: false,
                sort: false
            }
        },
        {
            name: "gender",
            label: "Gender",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "registration_date",
            label: "Registration Date",
            options: {
                filter: false,
                sort: false,
            }
        },
        {
            name: "subscription_period",
            label: "Subscription Period",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "registration_upto",
            label: "Registration Upto",
            options: {
                filter: false,
                sort: false,
                align: 'center'
            }
        },
        {
            name: "status",
            label: "Status",
            options: {
                filter: false,
                sort: false,
                align: 'center',
                customBodyRender: (value, tableMeta, updateValue) => {
        
                   
                    let [day, month, year] = tableMeta?.tableData[tableMeta?.rowIndex]?.registration_upto?.split('-')
                    let date = new Date(year, month - 1, day)
                    

                    return (
                        date.getFullYear() === today.getFullYear() && 
                        date.getMonth() === today.getMonth() && 
                        date.getDay()  === today.getDay() ? 
                        <Button style={{backgroundColor:"Red", color: "white"}}>Plan Expiring soon</Button> :
                        <Button style={{appearance:"link", backgroundColor:"green", color: "white"}}>Plan Ongoing</Button>
                        
                    );                                    
                }
            }
        },
        {
            name: "",
            label: "",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <center>
                            <Button
                                appearance='link' onClick={() => {
                                    setCurrentRowData(tableMeta?.tableData[tableMeta?.rowIndex])
                                    setUpdateModalOpen(true)
                                }}
                            >
                                Edit
                            </Button>
                        </center>
                    );
                }
            }
        }
    ]

    const options = {
        filter: true,
        search: true,
        download: false,
        viewColumns: false,
        print: false,
        pagination: false,
        rowHover: true,
        selectableRowsHideCheckboxes: true,
        customToolbarSelect: () => {},
        isRowSelectable: () => {}
    }
    
    async function getActiveMembers(){
        setLoaderOpen(true)
        setTimeout(() => {setLoaderOpen(false)}, 500)
        await axios.get('/api/active')
             .then((res) => {
                setData(res?.['data']);
             })
             .catch((e) =>{
                console.log(e)
             })
    }

    useEffect(() => {
        getActiveMembers()
    }, [refreshed])    


    const handleClose = () => {
        setUpdateModalOpen(false)
    }

    return (
        <>
            
            <UpdateMember handleClose={handleClose} open={updateModalOpen} rowData={currentRowData} refreshed={refreshed} setRefreshed={setRefreshed} setUpdateModalOpen={setUpdateModalOpen}/>         
            <div>
                {
                    loaderOpen ?  
                        <Loader  center speed='slow' size="lg" content="Loading..." /> 
                        :
                        <MemberTable 
                            title={`${data?.length} Active Members`} 
                            data={data} 
                            options={options} 
                            columns={columns} 
                        />
                }
            </div>
        </>
        
    );
}

export default ActiveMembers;
