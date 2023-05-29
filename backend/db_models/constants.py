import enum


class AdminConfigs(enum.Enum):
    ADMINS = {'abhasbind@gmail.com'}

class Role(enum.Enum):
    ADMIN = 'admin'
    USER = 'user'

class Gender(enum.Enum):
    MALE = 'Male'
    FEMALE = 'Female'

class FeeStatus(enum.Enum):
    PAID = 'paid'
    PENDING = 'pending'


MEMBER_KEYS = ['name', 'gender', 'email', 'mobile', 'address', 'registration_date',
             'registration_upto', 'dob', 'subscription_period', 'topup_amount', 'fee_status']