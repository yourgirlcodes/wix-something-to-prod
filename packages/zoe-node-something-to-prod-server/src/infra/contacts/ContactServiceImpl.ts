import { AspectStore } from '@wix/wix-aspects';

import {
  CreateContactRequest,
  DeleteContactRequest,
  GetContactRequest,
  UpdateContactRequest,
} from '../../api/proto/proto-types';
import { v4 as uuid } from 'uuid';
import {Contact, ContactService} from './ContactService';

const { applyFieldMask } = require('protobuf-fieldmask');


export class ContactServiceImpl implements ContactService {
  private contacts: Array<Contact> = [];

  constructor() {
  }

  async createContact(
    aspects: AspectStore,
    req: CreateContactRequest
  ): Promise<Contact> {
    const contact = { contact: req.contact, id: uuid() };

    this.contacts.push(contact);

    return contact;
  }

  async getContact(
    aspects: AspectStore,
    req: GetContactRequest
  ): Promise<Contact> {
    const fetchedContact = this.contacts.find(
      (contact) => contact.id === req.id
    );

    return fetchedContact;
  }

  async updateContact(
    aspects: AspectStore,
    req: UpdateContactRequest
  ): Promise<Contact> {
    const findContactIndex = (id: string) =>
      this.contacts.findIndex((c) => c.id === id);

    const contactToUpdateIndex = findContactIndex(req.id);
    const contactOriginal = this.contacts[contactToUpdateIndex];

    if (contactToUpdateIndex === -1) {
      await this.createContact(aspects, req.contact as any);
    }

    const updateDetails = applyFieldMask(req.contact, req.fieldMask);
    const updatedDetails = {
      contact: {
        ...contactOriginal.contact,
        ...updateDetails,
      },
    };

    this.contacts[contactToUpdateIndex] = {
      ...updatedDetails,
      id: contactOriginal.id,
    };

    const updatedContactId = findContactIndex(req.id);
    return this.contacts[updatedContactId];
  }

  async deleteContact(
    aspects: AspectStore,
    req: DeleteContactRequest
  ): Promise<{}> {
    this.contacts = this.contacts.filter((contact) => contact.id !== req.id);
    return {};
  }
}
