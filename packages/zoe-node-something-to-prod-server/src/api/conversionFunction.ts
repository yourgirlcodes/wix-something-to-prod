import {Contact} from '../infra/contacts/ContactService';
import {
  CreateContactResponse,
  GetContactResponse,
  UpdateContactResponse
} from './proto/proto-types';

export const convertToProto = (contact: Contact): CreateContactResponse | GetContactResponse | UpdateContactResponse => {
  return {
    contact: {
      name: contact.contact.name,
      description: contact.contact.description
    },
    id: contact.id
  };
};