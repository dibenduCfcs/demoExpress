import { SwaggerConfig } from '../../swagger/baseConfig';

export interface FieldSchema {
  type: 'string' | 'number' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  required?: boolean;
  properties?: Record<string, FieldSchema>; // For nested objects
  items?: FieldSchema; // For array items
}

export type SchemaDefinition = Record<
  string,
  FieldSchema | 'string' | 'number' | 'object'
>;

export abstract class BaseModel {
  abstract schema: SchemaDefinition;

  swaggerMetadata: SwaggerConfig['swaggerMetadata'];

  constructor() {
    this.swaggerMetadata = new SwaggerConfig().swaggerMetadata;
  }

  static createSchema<T extends BaseModel>(this: new () => T): T {
    return new this();
  }

  validate(body: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    this.validateSchema(body, this.schema, errors);
    return {
      valid: errors.length === 0,
      errors,
    };
  }

  getSwaggerMetadata() {
    return this.swaggerMetadata;
  }

  getModalSchema() {
    return this.schema;
  }

  getModelName(model: any) {
    return model.constructor.name;
  }

  private validateSchema(
    body: any,
    schema: SchemaDefinition,
    errors: string[],
    path: string = '',
  ) {
    Object.keys(schema).forEach((key) => {
      const field = schema[key];
      const value = body[key];

      const fieldSchema = typeof field === 'string' ? { type: field } : field;

      const currentPath = path ? `${path}.${key}` : key;

      if (
        fieldSchema.required &&
        (value === undefined || value === null || value === '')
      ) {
        errors.push(`${currentPath} is required.`);
      }

      if (fieldSchema.type === 'string' && typeof value !== 'string') {
        errors.push(`${currentPath} must be a string.`);
      }

      if (fieldSchema.type === 'number' && typeof value !== 'number') {
        errors.push(`${currentPath} must be a number.`);
      }

      if (fieldSchema.type === 'array') {
        if (!Array.isArray(value)) {
          errors.push(`${currentPath} must be an array.`);
        } else {
          if (fieldSchema.minItems && value.length < fieldSchema.minItems) {
            errors.push(
              `${currentPath} must contain at least ${fieldSchema.minItems} items.`,
            );
          }
          if (fieldSchema.maxItems && value.length > fieldSchema.maxItems) {
            errors.push(
              `${currentPath} can contain at most ${fieldSchema.maxItems} items.`,
            );
          }
          if (fieldSchema.items) {
            value.forEach((item: any, index: number) => {
              this.validateSchema(
                item,
                { item: fieldSchema },
                errors,
                `${currentPath}[${index}]`,
              );
            });
          }
        }
      }

      if (fieldSchema.type === 'object') {
        if (typeof value !== 'object' || Array.isArray(value)) {
          errors.push(`${currentPath} must be an object.`);
        } else if (fieldSchema.properties) {
          this.validateSchema(
            value,
            fieldSchema.properties,
            errors,
            currentPath,
          );
        }
      }

      if (
        fieldSchema.minLength &&
        typeof value === 'string' &&
        value.length < fieldSchema.minLength
      ) {
        errors.push(
          `${currentPath} must be at least ${fieldSchema.minLength} characters long.`,
        );
      }

      if (
        fieldSchema.maxLength &&
        typeof value === 'string' &&
        value.length > fieldSchema.maxLength
      ) {
        errors.push(
          `${currentPath} must be at most ${fieldSchema.maxLength} characters long.`,
        );
      }
    });
  }

  abstract createSchema(): BaseModel;
}
