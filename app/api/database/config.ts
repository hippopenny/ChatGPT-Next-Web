import AWS from "aws-sdk";

export const dynamoDbConfig = {
  region: "localhost",
  endpoint: process.env.DYNAMODB,
};
export const dynamoDb = new AWS.DynamoDB(dynamoDbConfig);
