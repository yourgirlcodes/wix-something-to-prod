import * as server from '../../generated/server/proto-generated';

import ContactService = server.services.com.wix.examples.ContactService;

import GetContactRequest = server.responses.com.wix.examples.GetContactRequest;
import GetContactResponse = server.responses.com.wix.examples.GetContactResponse;
import CreateContactRequest = server.responses.com.wix.examples.CreateContactRequest;
import CreateContactResponse = server.responses.com.wix.examples.CreateContactResponse;
import UpdateContactRequest = server.responses.com.wix.examples.UpdateContactRequest;
import UpdateContactResponse = server.responses.com.wix.examples.UpdateContactResponse;
import DeleteContactRequest = server.responses.com.wix.examples.DeleteContactRequest;
import DeletedContactResponse = server.responses.com.wix.examples.DeletedContactResponse;

export {
  ContactService,
  GetContactRequest,
  GetContactResponse,
  CreateContactRequest,
  CreateContactResponse,
  UpdateContactRequest,
  UpdateContactResponse,
  DeleteContactRequest,
  DeletedContactResponse
};