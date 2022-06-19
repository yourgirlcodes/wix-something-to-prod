import {BootstrapContext} from '@wix/wix-bootstrap-ng/typed';
import {ContactServiceImpl} from './infra/contacts/ContactServiceImpl';

export default function appConfig(context: BootstrapContext) {

  // this is the place to run your one-time initializations (e.g. databases), configuration loading etc.
  // build your own app specific graph of dependencies to be used within the service implementations.

  // no configuration for now.
  // context.config.load('zoe-node-something-to-prod-server-config');

  const contactService = new ContactServiceImpl();

  return {apiGwClient: context.apiGwClient, contactService};
}

export type AppContext = ReturnType<typeof appConfig>;
