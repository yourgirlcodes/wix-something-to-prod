import {ContactServiceImpl} from '../infra/contacts/ContactServiceImpl';
import {AppContext} from '../config';

import { AspectStore } from '@wix/wix-aspects';
import {
  ContactService,
  CreateContactRequest,
  CreateContactResponse,
  DeleteContactRequest,
  DeletedContactResponse,
  GetContactRequest,
  GetContactResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from '../api/proto/proto-types';
import {convertToProto} from './conversionFunction';

class RpcContactService extends ContactService {
  constructor(
        private readonly contactService: ContactServiceImpl
  ) {
    super();
  }

  async createContact(
    aspects: AspectStore,
    req: CreateContactRequest
  ): Promise<CreateContactResponse> {

    return convertToProto(await this.contactService.createContact(aspects, req));
  }

  async getContact(
    aspects: AspectStore,
    req: GetContactRequest
  ): Promise<GetContactResponse> {
    const contactId = req.id;

    return convertToProto(await this.contactService.getContact(aspects, {id: contactId}));
  }

  async updateContact(
    aspects: AspectStore,
    req: UpdateContactRequest
  ): Promise<UpdateContactResponse> {

    return convertToProto(await this.contactService.updateContact(aspects, req));
  }

  async deleteContact(
    aspects: AspectStore,
    req: DeleteContactRequest
  ): Promise<DeletedContactResponse> {

    return await this.contactService.deleteContact(aspects, {id: req.id});
  }
}

export const RpcContactServiceFactory = (context: AppContext) =>
  new RpcContactService(context.contactService);