import json
import boto3
import datetime as dt
from botocore.exceptions import ClientError


def create_user(email, phone_number, location, age, occupation, hobbies):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('User')
    response = table.put_item(
        Item={
            "email": email,
            "phone_number": phone_number, 
            "location": location,
            "age": age, 
            "occupation": occupation,
            "hobbies": hobbies
        }
    )
    
    return response


def lambda_handler(event, context):
    response = create_user(event['body']['email'], event['body']['phone_number'], event['body']['location'], event['body']['age'], event['body']['occupation'], event['body']['hobbies'])
    return {
        'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
        'statusCode': 200,
        'body': json.dumps(event)
    }
