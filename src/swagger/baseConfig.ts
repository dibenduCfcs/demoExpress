import 'reflect-metadata';

export class SwaggerConfig {
  // Default metadata to be used by Swagger decorators
  swaggerMetadata = {
    tags: ['Default'],
    responses: {
      200: { 
        description: 'Request was successful', 
        schema: {
          type: 'object',
          properties: {
            meta: {
              type: 'object',
              properties: {
                status_code: { type: 'integer' },
                status_message: { type: 'string' }
              },
              required: ['status_code', 'status_message']
            },
            data: { type: 'object' }
          },
          required: ['meta', 'data']
        }
      },
      400: { 
        description: 'Bad request', 
        schema: {
          type: 'object',
          properties: {
            meta: {
              type: 'object',
              properties: {
                status_code: { type: 'integer' },
                status_message: { type: 'string' }
              },
              required: ['status_code', 'status_message']
            },
            data: { type: 'object' }
          },
          required: ['meta', 'data']
        }
      }
    }
  };

  getSwaggerMetadata(): { description?: string; tags?: string[]; responses?: Record<number, { description: string; schema: any }> } {
    return this.swaggerMetadata;
  }

  validate(body: any): { valid: boolean; errors: string[] } {
    // Implement a generic validation logic here or leave it for derived classes
    return { valid: true, errors: [] };
  }

  
}
