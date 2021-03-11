import json
import boto3
from botocore.exceptions import ClientError

def get_request(id):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Request')
    try:
        response = table.get_item(Key={'id': int(id)})
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response['Item']


def lambda_handler(event, context):
    request = get_request(event['queryStringParameters']['id'])
    location = request.pop('location').split(', ')
    request['id'] = int(request['id'])
    request['lat'] = location[0]
    request['long'] = location[1]
    return {
        'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
        'statusCode': 200,
        'body':json.dumps(request),
    }
