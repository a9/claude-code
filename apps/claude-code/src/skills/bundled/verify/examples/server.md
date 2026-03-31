# Server Verification Example

## Scenario
You changed a server endpoint, middleware, or API response.

## Steps

1. Start the dev server:
   ```bash
   bun run dev
   # or: npm run dev, python manage.py runserver, etc.
   ```

2. Send a request to the changed endpoint:
   ```bash
   curl -s http://localhost:3000/api/endpoint | jq .
   ```

3. Verify the response:
   - Check HTTP status code: `curl -o /dev/null -s -w "%{http_code}" http://localhost:3000/api/endpoint`
   - Check response body matches expected schema
   - Check headers if relevant

4. Test error cases:
   - Invalid request body
   - Missing authentication
   - Non-existent resources (404)

5. Stop the dev server when done.

## What to report
- The endpoint(s) tested
- Request and response details
- Whether behavior matches expectations
