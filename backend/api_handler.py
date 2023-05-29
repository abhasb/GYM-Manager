from db_models import model
from dbconnection.db import db
import enum
import operator
from datetime import datetime, timedelta
from db_models import constants

class ConfigKeys(enum.Enum):
    ACTIVE = 'active'
    INACTIVE = 'inactive'
    INFO_KEYS = ['name', 'gender',
                 'mobile', 'registration_date',
                 'registration_upto', 'subscription_period', 
                ]

def handle_members_api(state):
    members = model.Member.query.all()

    data = []
    for member in members:
        res = {
            'name': member.name,
            'mobile': member.mobile,
            'gender': member.gender,
            'registration_date': member.registration_date.strftime('%d-%m-%Y'),
            'subscription_period': f"{member.subscription_period} Month",
            'registration_upto': member.registration_upto.strftime('%d-%m-%Y'),
            'active': member.state == 'active',
            'remarks': member.remarks
        } 
        if state == member.state:
            data.append(res)
    data = sorted(data, key=lambda x : x['name'])
    return data

def handle_add_member(data):
    data = data.get('member')
    try:
        name = data.get('name')
        gender = data.get('gender')
        mobile = data.get('mobile')
        registration_date = datetime.strptime(data.get('startDate') ,"%Y-%m-%dT%H:%M:%S.%f%z") + timedelta(hours=5, minutes=30)
        subscription_period = data.get('period').split(' ')[0]
        registration_upto = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%f%z") + timedelta(hours=5, minutes=30)
        remarks = data.get('remarks', '')
    except Exception as e:
        return False, "Can't add member"
    
    member = model.Member.query.get((name, mobile))
    if member:
        return False, "Member already present"

    active = registration_upto.strftime("%Y-%m-%d") >= datetime.now().strftime("%Y-%m-%d")
    status = "active" if active else "inactive"
    member = model.Member(name=name, gender=gender, mobile=mobile, registration_date=registration_date,
                          subscription_period=subscription_period, registration_upto=registration_upto,
                          state=status, remarks=remarks)
    
    db.session.add(member)
    db.session.commit()

    return True, "Member added successfully"


def handle_edit_member(data):
    data = data.get('member')
    prev_name = data.get('prev_name')
    prev_mobile = data.get('prev_mobile')
    member = model.Member.query.get((prev_name, prev_mobile))

    if not member:
        return False, "Member not present"

    if (prev_name != data.get('name') or prev_mobile != data.get('mobile')) and \
            model.Member.query.get((data.get('name'), data.get('mobile'))):
        return False, "Member already present with name and mobile"
    
    member.name = data.get('name')
    member.mobile = data.get('mobile')
    member.gender = data.get('gender')
    member.registration_date = datetime.strptime(data.get('startDate'), "%Y-%m-%dT%H:%M:%S.%f%z") + timedelta(hours=5, minutes=30)
    member.subscription_period = data.get('period').split(' ')[0]
    member.registration_upto = datetime.strptime(data.get('endDate'), "%Y-%m-%dT%H:%M:%S.%f%z") + timedelta(hours=5, minutes=30)
    member.remarks = data.get('remarks')
    

    active = member.registration_upto.strftime("%Y-%m-%d") >= datetime.now().strftime("%Y-%m-%d")
    state = "active" if active else "inactive"
    member.state = state

    db.session.commit()
    return True, "Successfully modified member"


def handle_refresh():
    members = model.Member.query.all() 

    for member in members:
        if member.registration_upto.date() < datetime.now().date(): 
            member.state = 'inactive'
        else:
            member.state = 'active'
    db.session.commit()

def handle_member_delete(name, mobile):
    member = model.Member.query.get((name, mobile))
    if not member:
        return False

    db.session.delete(member)
    db.session.commit()
    
    return True