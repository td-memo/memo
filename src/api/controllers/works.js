/** @typedef {import('@netlify/functions').HandlerEvent} Event */
/** @typedef {import('../utils/responses').Response} Response */
/** @typedef {import('../utils/external_api_adapters/types').Adapter} Adapter */
/** @typedef {import('../utils/errors').Error} Error */
const { pair, triplet, toPromise } = require('../utils/general')
const tmdb = require('../utils/external_api_adapters/films/tmdb')
const { getUrlSegments } = require('./utils')
const { Result, ok, err } = require('neverthrow')
const { match } = require('ts-pattern')
const errors = require('../utils/errors')
const responses = require('../utils/responses')

/** @type {(event: Event) => Promise<Response>} */
const searchForWork = (event) =>
  withAdapter('search', event)

/** @type {(event: Event) => Promise<Response>} */
const retrieveWork = (event) =>
  withAdapter('retrieve', event)

module.exports = {
  searchForWork,
  retrieveWork,
}

///////////////////////////////////////////////////////////////////////////////

/** @type {(action: keyof Adapter, event: Event) => Promise<Response>} */
const withAdapter = (action, event) => toPromise(
  getAdapter(event)
    // TODO: make typechecker happy
    .asyncAndThen((adapter) => adapter[action](getUrlSegments(event)[2]))
    .map(responses.ok)
    .mapErr(responses.fromError)
)

/** @type {(event: Event) => Result<Adapter, Error>} */
const getAdapter = (event) => match(getUrlSegments(event)[1])
  .with('films', () => ok(tmdb))
  .otherwise(() => err(errors.notFound()))

