// swaggerCommon.ts

import { HttpMethod } from "../commonUtility/commonFunction";

  export function generateSwaggerOperation(
    modelName:string,
    method:HttpMethod,
    modelSchema:any,
    requiresAuth:boolean,
    requiredFields: string[] = []
  ): Record<string, any> {
    let res = {
      tags: [modelName.replace('Controller', '')],
      responses: {
        200: {
          description: 'Success',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
      },
    }
    if(requiresAuth){
      res = {...res, ...{
        parameters: [
          { 
          in: 'header',              // Specify that this is a header parameter
          name: 'Authorization',     // Name of the header
          schema: {
            type: 'string',          // Data type
          },
        }
      ],
        security: [
          {
              // bearerAuth: [], // Secure this endpoint with bearer auth
              AuthorizationHeader: [],
          },
      ],
      }}
    }
    if (method !== 'get'){
      res = {...res,...{
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object', // Define the schema directly without $ref
                properties: modelSchema,
                required: requiredFields.length > 0 ? requiredFields : undefined, // Specify required fields
              },
            },
          },
        }
      }}
    }
    return res;
  }
  