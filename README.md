# CORS

The application needs to deal with CORS because of the websocket server.

This is handled by defining a `ENV_VAR` or `Secret` on the hosting provider,
The hosting provider uses this ENV_VAR and passes it into the CORS setup so that 
the server will accept requests from the original source

E.g.
```bash
CORS_ORIGIN=https://bob-api.bob.dev
```