import * as TestEnv from '@wix/wix-test-env';
import { responses } from '../src/generated/client/proto-generated';
import * as ApiGwTestkit from '@wix/wix-api-gw-lite-testkit';
import {
  ContactService,
  CreateContactResponse,
  DeletedContactResponse,
  GetContactResponse,
  UpdateContactResponse
} from '../src/api/proto/proto-types';

describe('Contacts server | IT', () => {
  const testContact = {
    contact: {
      name: 'Zoe',
      description: 'Author',
    },
  };

  const { contactServiceClient, apiGwTestkit } = TestEnv.builder()
    .withCollaborators({
      apiGwTestkit: ApiGwTestkit.server({
        allowedPermissions: ['USER.CAN_GREET', 'USER.CAN_READ'],
      }),
    })
    .withMainAppConfigEmitter((builder) => builder) // no configuration required for now. check ../templates directory
    .withMainApp('./src/index.ts', { env: { DEBUG: 'wix:info:*' } })
    .withGrpcClients({
      contactServiceClient: ContactService,
    })
    .build()
    .beforeAndAfter();

  it('can create contact', async () => {
    const aspects = apiGwTestkit.callContextBuilder().aspects();

    const response = await contactServiceClient.createContact(
      aspects,
      testContact
    );

    expect(response).toEqual<CreateContactResponse>({
      contact: {
        ...testContact.contact,
      },
      id: expect.any(String),
    });
  });

  it('can read contact', async () => {
    const aspects = apiGwTestkit.callContextBuilder().aspects();

    const createdContact = await contactServiceClient.createContact(
      aspects,
      testContact
    );

    const { id } = createdContact;
    const response = await contactServiceClient.getContact(aspects, { id });

    expect(response).toEqual<GetContactResponse>({
      contact: {
        ...testContact.contact,
      },
      id,
    });
  });

  it('can update contact', async () => {
    const aspects = apiGwTestkit.callContextBuilder().aspects();

    const contactToUpdateId = (
      await contactServiceClient.createContact(aspects, testContact)
    ).id;

    const response = await contactServiceClient.updateContact(aspects, {
      contact: {
        name: 'Zoe 2',
        description: '',
      },
      fieldMask: ['name'],
      id: contactToUpdateId,
    });

    const updatedDetails: responses.com.wix.examples.UpdateContactRequest = { // todo: check exports
      contact: {
        name: 'Zoe 2',
        description: 'Author',
      },
      id: contactToUpdateId,
    };

    expect(response).toEqual<UpdateContactResponse>(
      updatedDetails
    );
  });

  it('can delete contact', async () => {
    const aspects = apiGwTestkit.callContextBuilder().aspects();

    const contactToDelete = (
      await contactServiceClient.createContact(aspects, testContact)
    ).id;

    const response = await contactServiceClient.deleteContact(
      aspects, {
        id: contactToDelete
      }
    );

    expect(response).toEqual<DeletedContactResponse>({});
  });
});
