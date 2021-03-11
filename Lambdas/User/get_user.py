import json
import boto3
from botocore.exceptions import ClientError


def get_user(email, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')

    table = dynamodb.Table('User')

    try:
        response = table.get_item(Key={'email': email})
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response['Item']


def lambda_handler(event, context):
    user = get_user(event["queryStringParameters"]["id"])
    if user.get('age'):
        user['age'] = int(user['age'])
    if user:
        return {
            'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
            'statusCode': 200,
            'body': json.dumps(user)
        }
    else:
        return {
            'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
            'statusCode': 404,
            'body': json.dumps('User not found')
        }
