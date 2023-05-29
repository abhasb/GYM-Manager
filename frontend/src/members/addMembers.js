import React, { useState } from 'react';
import { DatePicker } from 'rsuite';
import { Form, Input, ButtonToolbar, Button, SelectPicker, Modal, Schema} from 'rsuite';
import logo from '../../src/gym.png';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const genderData = ['Male', 'Female'].map(item => ({
    label: item,
    value: item 
}));

const subscriptionPeriodData = ['1 Month Pack', 
                                '2 Month Pack',
                                '3 Month Pack',
                                '6 Month Pack',
                                '12 Month Pack'].map(item => ({
                                    label: item,
                                    value: item
                                }));

const nameRule = Schema.Types.StringType().isRequired('This field is required')
const mobileRule = Schema.Types.StringType().isRequired('This field is required')

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const AddMember = ({handleClose, setRefreshed, refreshed, open}) => {

    let today = new Date()
    let one_month_ahead_date = new Date(today.setMonth(today.getMonth() + 1))

    const [formValue, setFormValue] = React.useState({
        name: '',
        mobile: '',
        gender: 'Male',
        period: subscriptionPeriodData[0]['label'],
        startDate: new Date(),
        endDate: new Date(one_month_ahead_date.setDate(one_month_ahead_date.getDate() - 1)),
        remarks: '',
    })
    
    const MemberAddednotify = () => toast.success("Member added Successfully!", {
        theme: "colored",
        position: toast.POSITION.TOP_RIGHT
    })

    const MemberAddingFailedNotify = () => {
            toast.error("Member already Present!", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    console.log(formValue)
    const onPeriodChange = (e) => {
        let currDate = new Date(formValue['startDate'])
        let months = e.split(' ')[0]
        currDate = new Date(currDate.setMonth(currDate.getMonth() + Number(months)))
        setFormValue({...formValue, ['period']: e, ['endDate']: new Date(currDate.setDate(currDate.getDate() - 1))})
        
    }   

    const handleStartDateChange = (e) => {
        let beginDate = new Date(e.setMonth(e.getMonth()))
        let afterDate = new Date(e.setMonth(e.getMonth() + Number(formValue['period'].split(' ')[0])))
        setFormValue({...formValue, ['startDate']: beginDate,
                                    ['endDate']: new Date(afterDate.setDate(afterDate.getDate() -1)) })
    }
    
    async function addMember(){
        if (formValue?.['name'] === '' && formValue?.['mobile'] === ''){
            return;
        }
        await axios.post('/api/addmember', {
            member: formValue
        }).then((res) => {
            if (res?.data?.status === true) {
                MemberAddednotify()
                setRefreshed(!refreshed)
                setFormValue({...formValue, ['name']: '',
                                            ['mobile']: '',
                                            ['remarks']: '',
                                            ['period']: subscriptionPeriodData[0]['label'],
                                            ['startDate']: new Date(),
                                            ['endDate']: new Date(one_month_ahead_date.setDate(one_month_ahead_date.getDate() - 1)),
                })
            }
            else {
                MemberAddingFailedNotify()
            }
        }).catch("Error in adding Member") 
    }

    return (
        <>
            <Modal open={open} onClose={handleClose} size="sm"
                style={{
                    marginTop: 40
                }}
            >
                <Modal.Header>
                    <Modal.Title> New Member </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontSize: 12}}>
                    <Form onChange={setFormValue} formValue={formValue}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div>
                                <Form.Group controlId="name">
                                    <Form.ControlLabel>Name</Form.ControlLabel>
                                    <Form.Control name="name" rule={nameRule}/>
                                    <Form.HelpText>Required</Form.HelpText>
                                </Form.Group>
                                <Form.Group controlId="mobile">
                                    <Form.ControlLabel>Mobile</Form.ControlLabel>
                                    <Form.Control name="mobile" rule={mobileRule}/>
                                    <Form.HelpText>Required</Form.HelpText>
                                </Form.Group>
                            </div>
                            <div style={{marginRight: 30}}>
                                <img style={{paddingTop: 10}} src={logo}/>
                            </div>
                        </div>
                        <div style={{display: "flex", marginTop: 10}}>
                            <Form.Group controlId="gender">
                                <Form.ControlLabel>Gender</Form.ControlLabel>
                                <Form.Control name="gender" searchable={false} cleanable={false}  data={genderData} accepter={SelectPicker} size="sm" placeholder="Small"/>
                            </Form.Group>
                            <Form.Group controlId="period" style={{marginLeft: 90}}>
                                <Form.ControlLabel>Subscription Period</Form.ControlLabel>
                                <Form.Control name="period" searchable={false} cleanable={false} data={subscriptionPeriodData} accepter={SelectPicker} onChange={onPeriodChange} size="sm" placeholder="Small"/>
                            </Form.Group>
                        </div>
                        <div style={{display: "flex"}}>
                            <Form.Group controlId="startDate">
                                <Form.ControlLabel>Start Date</Form.ControlLabel>
                                <Form.Control name="startDate" accepter={DatePicker} onChange={handleStartDateChange} cleanable={false} format='dd-MM-yyyy' placement="leftEnd"  size="sm" placeholder="Small"/>
                            </Form.Group>
                            <Form.Group controlId="endDate" style={{marginLeft: 50}}>
                                <Form.ControlLabel>End Date</Form.ControlLabel>
                                <Form.Control name="endDate" accepter={DatePicker} readOnly format='dd-MM-yyyy' size="sm" placeholder="Small"/>
                            </Form.Group>
                        </div>
                        <div>
                            <Form.Group controlId="remarks">
                                <Form.ControlLabel>Remarks</Form.ControlLabel>
                                <Form.Control rows={3} name="remarks" accepter={Textarea} />
                            </Form.Group>
                        </div>
                        <Button type="submit" style={{marginTop: 20, width: 100, backgroundColor: "#40a240", color: "#ffffff", fontWeight: 800}} onClick={addMember}> Submit </Button>
                        
                    </Form>

                    
                </Modal.Body>
            </Modal>
            <ToastContainer/>
        </>
    );
}

export default AddMember;