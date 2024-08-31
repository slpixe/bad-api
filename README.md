# Bad Api 
## Embrace the Chaos of Real-World API Interactions

Bad API is intentionally unreliable. 
It ~~randomly~~ systematically times out, throws errors, 
responds unpredictably, or even refuses to respond at all. 
Designed to mimic the messy, imperfect nature of real-world APIs, 
Bad API challenges developers to build robust, 
resilient applications that can handle anything thrown their way. 
Whether you’re learning to code, testing error handling, or stress-testing 
your system, Bad API is here to help you prepare for the 
unexpected—because in the wild, APIs rarely behave perfectly.

## Routes

- `/api` - Our Bad API endpoints
- `/config` - Configuration of the `/api` endpoint
- `/demo` - Some example endpoints which demonstrate the bad responses that could come from a bad api

## `/api/`

- `GET /good` - Returns a 200 OK response, indicating a successful operation with expected data.

- `GET /bad-client` - Simulates a client-side error (status 4xx), such as 400 Bad Request or 404 Not Found, to test client error handling.

- `GET /bad-server` - Simulates a server-side error (status 5xx), such as 500 Internal Server Error, to test server error handling.

- `GET /error` - Returns a generic error response, used for testing general error scenarios.

- `GET /json` - Returns JSON-formatted data, typically a standard JSON object, for testing standard JSON responses.

[//]: # (- `GET /json-string` - &#40;Currently commented out&#41; Intended to return a JSON string response. Uncomment in `api.http` to test.)

- `GET /jsonp` - Returns JSONP-formatted data (JSON with padding), used for testing JSONP response formats.

- `GET /rand-error` - Randomly returns either a successful response or an error, used for testing unpredictable error conditions.
