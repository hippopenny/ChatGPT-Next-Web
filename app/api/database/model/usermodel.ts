import AWS from "aws-sdk";
import { dynamoDb, dynamoDbConfig } from "../config";

const dynamoDBClient = new AWS.DynamoDB.DocumentClient(dynamoDbConfig);

const UserNextChatTable = {
  TableName: "UserNextChat",
};
const userSchema = {
  idUser: { type: "String", required: true },
  nameUser: { type: "String", required: false },
  emailUser: { type: "String", required: false },
  balanceUser: { type: "Number", required: true },
  socialUser: { type: "Obj", require: false },
};

/**
 *   UserNextChatTable ? create : ""
 */
async function checkUserNextChatTable() {
  try {
    const tables = await dynamoDb.listTables().promise();
    if (!tables.TableNames?.includes(UserNextChatTable.TableName)) {
      const params = {
        AttributeDefinitions: [
          {
            AttributeName: "idUser",
            AttributeType: "S",
          },
        ],
        KeySchema: [
          {
            AttributeName: "idUser",
            KeyType: "HASH",
          },
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
        TableName: UserNextChatTable.TableName,
      };

      await dynamoDb.createTable(params).promise();
      console.log(`Table: ${UserNextChatTable.TableName} successfully.`);
    } else {
      console.log(`Table: ${UserNextChatTable.TableName} already exists.`);
    }
  } catch (error) {
    console.error("Error creating table:", error);
  }
}
checkUserNextChatTable();

/**
 * get all user from userTable
 */
export async function getAllUser() {
  try {
    const params = {
      TableName: UserNextChatTable.TableName,
    };

    const result = await dynamoDBClient.scan(params).promise();
    return result.Items;
  } catch (error) {
    console.log(`Unable to get all users: ${error}`);
  }
}

/**
 * add user to userTable
 */
export async function addUser(user) {
  try {
    const params = {
      TableName: UserNextChatTable.TableName,
      Item: user,
    };

    const existingWorkflow = await dynamoDBClient
      .get({
        TableName: UserNextChatTable.TableName,
        Key: {
          idUser: user.idUser,
        },
      })
      .promise();

    await dynamoDBClient.put(params).promise();
    return user;
  } catch (error) {
    console.error(`Unable to add user: ${error}`);
  }
}

export async function deleteUser(idUser: string) {
  try {
    const params = {
      TableName: UserNextChatTable.TableName,
      Key: {
        idUser: idUser,
      },
    };

    await dynamoDBClient.delete(params).promise();
    return `User with id ${idUser} deleted successfully.`;
  } catch (error) {
    console.log(`Unable to delete user: ${error}`);
  }
}

export async function getByIdUser(idUser: string) {
  try {
    const params = {
      TableName: UserNextChatTable.TableName,
      Key: {
        idUser: idUser,
      },
    };

    const result = await dynamoDBClient.get(params).promise();

    if (result.Item) {
      return result.Item;
    } else {
      return null; // Return null if the item with the specified idUser is not found
    }
  } catch (error) {
    console.log(`Unable to get user by userId: ${error}`);
  }
}

//
