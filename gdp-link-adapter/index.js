const axios = require('axios')

const subgraphEndpoint = 'https://api.thegraph.com/subgraphs/id/QmWK9WsVcA3SwTiQV5JivfXsiY2hP1u1dmoarGRrcYThWL'

const createRequest = async (input, callback) => {
  // validate the Chainlink request data
  const jobRunID = input.id || '1'
  const { startTime, endTime } = input
  if(!Number(startTime) || !Number(endTime))
    callback(500, {jobRunID, statusCode: 500, error: 'Invalid job params'})

  let gdpSum = 0;
  let apiResponse = {pagination: 'initialrequest'};
  // recur calls to Graph until all Jobs are fetched
  while(apiResponse.pagination) {
    const {gdp, response, error} = await queryGraph(
      startTime,
      endTime,
      apiResponse.pagination
    );
    console.log('graph response', error, gdp);
    if(error)
      return callback(500, {jobRunID, error, statusCode: 500})
    gdpSum += gdp
    apiResponse = response
  }

  console.log('total gdp', gdpSum);
  callback(200, {
    jobRunID,
    data: apiResponse.data,
    result: gdpSum,
    statusCode: apiResponse.status,
  })

  // probs need to do some form of pagination here

  // Get params from chainlink job (cadence, block start)
  // Fetch all payment data from the graph  
  // sum all payments
  // return data to chainlink job
}

const queryGraph = (startTime, endTime, paginationKey) => {
  console.log('query graph params', startTime, endTime);
  const data = {
    query: `
      query($startTime: BigInt, $endTime: BigInt) {
        jobEntities(where: {
            timestamp_lte: $endTime,
            timestamp_gte: $startTime
          }) {
            payment
          }
        }
    `,
    variables: {
      startTime,
      endTime,
    }
  }

  return axios.post(subgraphEndpoint, data)
    .then(response => {
      if(response.data.errors) {
        console.log('graph errors', response.data.errors.map(console.log));
        return { error: response.data.errors}
      }

      const gdp = response.data.data.jobEntities
        .reduce((gdp, { payment }) => gdp + Number(payment), 0)
      return { gdp, response }
    })
    .catch(error => {
      return { error }
    })
}

exports.createRequest = createRequest

// This is a wrapper to allow the function to work with
// GCP Functions
exports.gcpservice = (req, res) => {
  createRequest(req.body, (statusCode, data) => {
    res.status(statusCode).send(data)
  })
}

// This is a wrapper to allow the function to work with
// AWS Lambda
exports.handler = (event, context, callback) => {
  createRequest(event, (statusCode, data) => {
    callback(null, data)
  })
}

// This is a wrapper to allow the function to work with
// newer AWS Lambda implementations
exports.handlerv2 = (event, context, callback) => {
  createRequest(JSON.parse(event.body), (statusCode, data) => {
    callback(null, {
      statusCode: statusCode,
      body: JSON.stringify(data),
      isBase64Encoded: false
    })
  })
}
