var apiCalls = 0;
const dateObj = new Date();
var time = Date.now();
var differences = 0;


exports.handler = async (event) => {
    apiCalls++;
    var newTime = Date.now();
    var difference = newTime-time;
    differences += difference;
    if("queryStringParameters" in event && "cmd" in event.queryStringParameters && event.queryStringParameters.cmd == "RESET"){
        const response = {
            statusCode: 200,
            body: JSON.stringify({ThisInvocation: dateObj.toTimeString()} )
        };
        apiCalls = 0;
        differences = 0;
        return response;
    }

    else{
        const response = {
            statusCode: 200,
            body: JSON.stringify({ThisInvocation: dateObj.toTimeString(),
                TimeSinceLast : difference,
                TotalInvocationsOnThisContainer : apiCalls,
                AverageGapBetweenInvocations : differences/apiCalls} )
        };
        time = newTime;
        return response;
    }

};

