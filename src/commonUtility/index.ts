import { NextFunction, Response } from 'express';
import jsonwebtoken, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { JsonResponse } from '../class/response';
let singingKey = 'aUZyH5F8FGFDzxduYKJD5';

interface FieldSchema {
  type: 'string' | 'number' | 'array' | 'object';
  minLength?: number;
  maxLength?: number;
  minItems?: number;
  maxItems?: number;
  required?: boolean;
  properties?: Record<string, FieldSchema>; // For nested objects
  items?: FieldSchema; // For array items
}

// Extend Request to include a `user` property
export type requestType = Request['headers'];

export interface RequestType extends Request {
  headers: requestType & { authorization?: string };
  userInfo?: any;
}

class CommonUtility {
  validateRequestBody(
    body: any,
    schema: Record<string, string>,
  ): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    Object.keys(schema).forEach((key) => {
      if (typeof body[key] !== schema[key]) {
        errors.push(`${key} is required and must be a ${schema[key]}.`);
      }
    });

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  genrateJWTToken(payload: any, options?: SignOptions) {
    return jsonwebtoken.sign(payload, singingKey, {
      algorithm: options?.algorithm ?? 'HS256',
      expiresIn: options?.expiresIn ?? '24 hrs',
      allowInsecureKeySizes: options?.allowInsecureKeySizes ?? false,
      allowInvalidAsymmetricKeyTypes:
        options?.allowInvalidAsymmetricKeyTypes ?? false,
      issuer: options?.issuer ?? 'dibendugorai',
    });
  }

  verifyJWTToken(
    token: string,
    callback?: (err: any, info: any) => void,
    options?: VerifyOptions,
  ) {
    return jsonwebtoken.verify(
      token,
      singingKey,
      {
        algorithms: options?.algorithms ?? ['HS256'],
        issuer: options?.issuer ?? 'dibendugorai',
        ignoreExpiration: options?.ignoreExpiration ?? false,
      },
      callback,
    );
  }

  authenticateJWT(req: RequestType, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      this.verifyJWTToken(token, (err, info) => {
        if (err) {
          return new JsonResponse({}, 'Session expired', 10).send(res); // Invalid token
        }

        req.userInfo = info; // Attach the JWT claims (like user info) to req.user
        next();
      });
    } else {
      return new JsonResponse({}, 'Session expired', 10).send(res); // Invalid token
    }
  }

  isNullUndefined = (item: any) => {
    try {
      let x =
        item === null ||
        item === undefined ||
        item === 'undef' ||
        item === 'undefined' ||
        item === 'null' ||
        item === '' ||
        Number.isNaN(item) ||
        item === ' ';
      return x;
    } catch (err) {
      return true;
    }
  };
}

export { CommonUtility };
