import json
import boto3
import datetime as dt
from botocore.exceptions import ClientError


def create_request(title, category, description, expires_on, requester_id, location):
    id = round(dt.datetime.now().timestamp() * 1000)
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Request')
    response = table.put_item(
        Item={
            'id': id,
            'title': title,
            'category': category,
            'description': description,
            'expires_on': expires_on,
            'requester_id': requester_id,
            'location': location,
            'potential_helper_ids': [],
            'helper_id': "",
            'status': "open"
        }
    )
    
    return response


def lambda_handler(event, context):
    response = create_request(event['body']['title'], event['body']['category'], event['body']['description'], event['body']['expires_on'], event['body']['requester_id'], event['body']['location'])
    return {
        'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
        'statusCode': 200,
        'body': json.dumps(event)
    }
