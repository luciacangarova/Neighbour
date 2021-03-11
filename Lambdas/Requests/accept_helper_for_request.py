import json
import boto3
from botocore.exceptions import ClientError

def accept_request(id, helper_id):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Request')
    try:
        response = table.update_item(
            Key={'id': int(id),},
            UpdateExpression="set helper_id = :h",
            ExpressionAttributeValues={':h': helper_id}
        )
    except ClientError as e:
        print(e.response['Error']['Message'])
    else:
        return response


def lambda_handler(event, context):
    response = accept_request(event['queryStringParameters']['id'], event['queryStringParameters']['helper_id'])
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
