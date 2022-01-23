# https://td-memo.netlify.app/

## Prerequisites

- [Node and NPM](https://nodejs.org/)

## Running locally

```bash
# install the dependencies
npm install

# It will then be available locally for building with
npm run dev
# or preferably
npx netlify dev
```

If you use `npx netlify dev` your serverless functions will also be available at:

```
GET http://localhost:8888/api/<function_file_name_without_extension>
```

## About EleventyOne

The project scaffold originally includes:

- [Eleventy](https://11ty.io)
- A tiny inline JS pipeline
- Serverless (FaaS) development pipeline with [Netlify Dev](https://www.netlify.com/products/dev) and [Netlify Functions](https://www.netlify.com/products/functions)

## Credentials

This project is deployed via netlify with the account `m.tam.carre@gmail.com`
(ask Tam for password).

You might need to run `npx netlify login` inside the project.

## Netlify plugins

### Identity

Managed at https://app.netlify.com/sites/td-memo/identity

### FaunaDB

Managed at https://dashboard.fauna.com by logging in with netlify account integration.

## Error handling

Error handling is done using `neverthrow`, which is similar to
Rust Result or FP Either. Learn more about its API at:
https://github.com/supermacro/neverthrow

## Environment variables

External API keys are set in [Netlify](https://app.netlify.com/sites/td-memo/settings/deploys#environment)
environment variables. They are also avaiable in production inside
`process.env`.
