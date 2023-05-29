from dbconnection.db import db
from datetime import datetime
from db_models import constants
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship



class BaseModel(db.Model):
    __abstract__ = True
    created = db.Column('created', db.DateTime, default=datetime.now)
    updated = db.Column('updated', db.DateTime, default=datetime.now, onupdate=datetime.now)
    

class Member(BaseModel):
    __table_name__ = 'member'
    
    name = db.Column('name', db.String, primary_key=True)
    gender = db.Column('gender', db.String, nullable=False)
    mobile = db.Column('mobile', db.String, primary_key=True)
    registration_date = db.Column('registration_date', db.DateTime)
    registration_upto = db.Column('registration_upto', db.DateTime)
    subscription_period = db.Column('subscription_period', db.Integer, default=0)
    remarks = db.Column('remarks', db.String, default="")
    state = db.Column('active', db.String, default="inactive")

    def __repr__(self):
        return f"<Member  (name={self.name}, mobile={self.mobile})>"
    




