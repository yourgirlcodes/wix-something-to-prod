import bootstrap from '@wix/wix-bootstrap-ng/typed';
import apiGwClient from '@wix/wix-bootstrap-api-gw-client';
import appConfig from './config';
import {RpcContactServiceFactory} from './api/ContactService';

bootstrap()
  .use(apiGwClient)
  .config(appConfig)
  .service(RpcContactServiceFactory)
  .start();
