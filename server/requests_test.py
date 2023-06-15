import requests
import json

url = 'http://localhost:5000/api/'

def getOrdersByCustomerId_f():
    getOrdersByCustomerId_data = {
        'customer_id': 28
    }
    getOrdersByCustomerId = requests.post(url + 'getOrdersByCustomerId', data=getOrdersByCustomerId_data)

    return getOrdersByCustomerId

def getUser_f():
    getUser_query = 'token=reship.api.wCsmZl06DBymzOELsVx6NiKKf3AUI2I6NUcfg1NjtfzbmujZxm'

    getUser = requests.get(url + 'getUser?' + getUser_query)

    return getUser

def addBasket_f():
    addBasket_data = {
        "product_id": 1, 
        "token": 'reship.api.wCsmZl06DBymzOELsVx6NiKKf3AUI2I6NUcfg1NjtfzbmujZxm'
    }
    addBasket = requests.post(url + 'addBasket', data=addBasket_data)

    return addBasket

def createOrder_f():
    createOrder_data = {
        "first_name": '1',
        "last_name": '1',
        "number": '1',
        "email": '1',
        "adress": '["index": 1]',
        "promocode": '1',
        "basket": '[""]',
        "token": 'reship.api.wCsmZl06DBymzOELsVx6NiKKf3AUI2I6NUcfg1NjtfzbmujZxm',
    }
    createOrder = requests.post(url + 'createOrder', data=createOrder_data)

    return createOrder

data = json.loads(addBasket_f().text)
print(json.dumps(data, indent=4))