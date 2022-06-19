# contact service

This monorepo contains contact API and server implementation modules.

Uses [lerna.js](https://lerna.js.org/) for monorepo management.

### modules
- [zoe-node-something-to-prod-api](./packages/zoe-node-something-to-prod-api)
- [zoe-node-something-to-prod-server](./packages/zoe-node-something-to-prod-server)

### TODO:
- define your API in [protobuf](./packages/zoe-node-something-to-prod-api/src/main/proto)
- implement your service [here](packages/zoe-node-something-to-prod-server/src/infra/services)
- your tests are [here](./packages/zoe-node-something-to-prod-server/__tests__)

### Notes:
This project is configured to use [Loki](https://github.com/wix-private/loki#loki) for managing dependency versions.
# wix-something-to-prod
