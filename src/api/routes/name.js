/** @typedef {import('@netlify/functions').Handler} Handler */
const responses = require('../utils/responses')
const { matchVerbAndNumberOfUrlSegments, } = require('../router')
const { findOwnName, setOwnName } = require('../controllers/users')

/** @type Handler */
exports.handler = async (event, context) =>
  matchVerbAndNumberOfUrlSegments(event)

    // GET /api/name
    .with(['GET', 0], () => findOwnName(context))

    // GET /api/name/:newName
    .with(['GET', 1], () => setOwnName(event, context))

    .otherwise(() => responses.badRequest())