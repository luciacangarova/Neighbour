import json
import boto3
from botocore.exceptions import ClientError

def accept_request(id, helper_id):
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Request')
    try:
        response = table.update_item(
            Key={'id': int(id)},
            UpdateExpression="set #h = list_append(#h, :h), #s = :s",
            ExpressionAttributeNames={'#h': 'potential_helper_ids', '#s': 'status'},
            ExpressionAttributeValues={':h': [helper_id], ':s':'pending'},
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response


def lambda_handler(event, context):
    event = event['body']
    response = accept_request(event['id'], event['helper_id'])
    return {
        'headers': {"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT","Access-Control-Allow-Headers":"Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token","Content-Type":"application/json"},
        'statusCode': 200,
        'body': json.dumps(response)
    }
