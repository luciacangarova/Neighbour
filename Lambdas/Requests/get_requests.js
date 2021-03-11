var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB({region: 'eu-west-2', apiVersion: '2012-08-10'});


exports.handler = (event, context,callback) => {
  //callback(null, {statusCode: 200, body: event});
  
 
//  var lat = event.header.lat;
//  var long = event.header.long;
 
  var params = {
      TableName: 'Request',
    };
    
    dynamo.scan(params, function(err, data){
        if(err){
            let error = {
                statusCode: 404,
                headers: { "Content-Type": "text/plain" } ,// not sure here
                body: err,
            }
        }else{
            let requests = [];
            data.Items.map((item) => {
                let location = item.location.S.split(", ");
             let request = {
              id: item.id.N,
              title: item.title.S,
              description: item.description.S,
              category: item.category.S,
              expires_on: item.expires_on.S,
              lat:location[0],
              long:location[1],
              requester_id:item.requester_id.S,
              potential_helper_ids: item.potential_helper_ids,
              helper_id: item.helper_id,
              status: item.status
             }
            requests.push(request)
            });
            console.log(requests);
            callback(null, {statusCode: 200, body: requests});
        }
    });
    

};