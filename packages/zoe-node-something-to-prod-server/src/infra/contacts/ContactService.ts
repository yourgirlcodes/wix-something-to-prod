import {responses} from '../../generated/server/proto-generated';
import {AspectStore} from '@wix/wix-aspects';
import {
  CreateContactRequest,
  CreateContactResponse, DeleteContactRequest, DeletedContactResponse,
  GetContactRequest,
  GetContactResponse, UpdateContactRequest, UpdateContactResponse
} from '../../api/proto/proto-types';

export interface Contact {
    contact?: responses.com.wix.examples.Contact;
    id?: string;
}

export interface ContactService {
  createContact(
    aspects: AspectStore,
    req: CreateContactRequest
  ): Promise<Contact>;

  getContact(aspects: AspectStore, req: GetContactRequest): Promise<Contact>;

  updateContact(
    aspects: AspectStore,
    req: UpdateContactRequest
  ): Promise<Contact>;

  deleteContact(
    aspects: AspectStore,
    req: DeleteContactRequest
  ): Promise<{}>;
}