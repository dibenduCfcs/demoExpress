import 'reflect-metadata';
import { routesMetadataKey } from '../commonUtility/commonFunction';


export function getSwaggerRoutesMetadata(controllers: any[]): Record<string, any> {
  const metadata: Record<string, any> = {};
  
  controllers.forEach((controller) => {
  const controllerMetadata = Reflect.getMetadata(routesMetadataKey, controller.prototype);
  controllerMetadata.forEach((metaData:any) => {
      const postMetadata = Reflect.getMetadata('swagger:post', controller.prototype, metaData.name);
      const getMetadata = Reflect.getMetadata('swagger:get', controller.prototype, metaData.name);
      const putMetadata = Reflect.getMetadata('swagger:put', controller.prototype, metaData.name);
      const deleteMetadata = Reflect.getMetadata('swagger:delete', controller.prototype, metaData.name);

      const basePath = metaData?.basePath || ''; // Ensure basePath is correctly obtained
      const apiPath = metaData?.path || ''; // Ensure basePath is correctly obtained

      if (postMetadata) {
        metadata[`${basePath}${apiPath}`] = {
          ...metadata[`${basePath}${apiPath}`],
          post: postMetadata,
        };
      }
      if (getMetadata) {
        metadata[`${basePath}${apiPath}`] = {
          ...metadata[`${basePath}${apiPath}`],
          get: getMetadata,
        };
      }
      if (putMetadata) {
        metadata[`${basePath}${apiPath}`] = {
          ...metadata[`${basePath}${apiPath}`],
          put: putMetadata,
        };
      }
      if (deleteMetadata) {
        metadata[`${basePath}${apiPath}`] = {
          ...metadata[`${basePath}${apiPath}`],
          delete: deleteMetadata,
        };
      }
    });
  });

  return metadata;
}
