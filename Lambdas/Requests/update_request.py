import json
import boto3


def update_request(param_dict):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Request')
    id = param_dict.pop('id')
    for key, value in param_dict.items():
        response = table.update_item(
            Key={'id': int(id)},
            UpdateExpression="set #s = :h",
            ExpressionAttributeNames= {'#s': "%s" % key},
            ExpressionAttributeValues={':h': value}
        )
    return True


def lambda_handler(event, context):
    if update_request(event['queryStringParameters']):
        return {
            'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
            'statusCode': 200,
        }
