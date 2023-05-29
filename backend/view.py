from flask import Blueprint, make_response, jsonify
from api_handler import handle_members_api, handle_add_member, handle_edit_member, handle_refresh, handle_member_delete
from flask import request


api_blueprint = Blueprint('api_blueprint', __name__)



@api_blueprint.route('/active', methods=['GET'])
def members_active():
    handle_refresh()
    data = handle_members_api(state='active')
    return make_response(jsonify(data), 200)


@api_blueprint.route('/inactive', methods=['GET'])
def members_inactive():
    handle_refresh()
    data = handle_members_api(state='inactive')
    return make_response(jsonify(data), 200)


@api_blueprint.route('/addmember', methods=['POST'])
def add_member():
    result = {}
    if request.headers.get('Content-Type') == 'application/json':
        data = request.json
        status, msg = handle_add_member(data)
        result =  {
            "status": status,
            "msg": msg
        }
    return result

@api_blueprint.route('/update/member', methods=['POST'])
def update_member():
    result = {}
    if request.headers.get('Content-Type') == 'application/json':
        data = request.json
        status, msg = handle_edit_member(data)
        result = {
            "status": status,
            "msg": msg
        }

    return result

@api_blueprint.route('/refresh', methods=['GET'])
def refresh():
    handle_refresh()

    return {
        "msg": "Ok"
    }

@api_blueprint.route('/delete/member', methods=['POST'])
def delete_member():
    if request.headers.get('Content-Type') == 'application/json':
        data = request.json.get('member', {})
        name, mobile = data.get('name'), data.get('mobile')
        if name and mobile and handle_member_delete(name, mobile):
            return {
                "msg": "Ok"
            }
        
    return {
        "msg": "error"
    }
            
