# Frontend Authentication Integration

This guide describes the registration and login API currently implemented by `backend-main`.

## API setup

- Local API base URL: `http://localhost:3000` (unless `PORT` is set in the backend environment).
- The backend allows the frontend origin configured by `CLIENT_ORIGIN`; it defaults to `http://localhost:5173`.
- Requests and responses use JSON.
- Current auth routes are under `/api/users`.

## Endpoints

### Register

`POST /api/users/register`

Request body:

```json
{
  "name": "Akhil",
  "email": "buyer@example.com",
  "password": "at-least-8-chars"
}
```

Name must be a non-empty string up to 100 characters. Email is trimmed and lowercased by the API and must have a valid email shape. Password must be 8–128 characters. Registration always creates a customer account (`role: "user"`); the frontend must not send or rely on a requested role.

Successful response (**201**):

```json
{
  "success": true,
  "message": "Account created. You are signed in as a customer.",
  "user": {
    "id": "USER_ID",
    "name": "Akhil",
    "email": "buyer@example.com",
    "role": "user"
  },
  "token": "SIGNED_TOKEN"
}
```

### Login

`POST /api/users/login`

Request body:

```json
{
  "email": "buyer@example.com",
  "password": "at-least-8-chars"
}
```

Successful response (**200**) has `success`, `message`, `user`, and `token`. The `user` object contains `id`, `name`, `email`, and `role`. The message differs for admins and customers. The backend does not currently return a `redirectTo` field, despite what the README says.

## Status codes and handling

| Status | Meaning | Suggested UI behavior |
| --- | --- | --- |
| `400` | Invalid/missing fields | Show the returned `message`; keep entered fields so the customer can correct them. |
| `401` | Email is not registered or password is incorrect | Show the returned `message`. For an unregistered email, offer registration; for a wrong password, let the customer retry or use password reset when available. |
| `409` | Registration email already exists | Offer the sign-in link. |
| `500` | Unexpected server failure | Show a retry message; do not expose stack traces. |

All current error responses are JSON with `{ "success": false, "message": "..." }`.

## Frontend request example

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export async function login(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Could not sign in.");
  }

  return data; // { success, message, user, token }
}
```

Use the same pattern for registration, posting to `/api/users/register` with `name`, `email`, and `password`.

## After authentication

1. Keep the returned `user` in your app's auth state so the UI can show the signed-in customer.
2. Send the returned token on requests that require authentication:

   ```http
   Authorization: Bearer SIGNED_TOKEN
   ```

3. The token includes the user ID and role and expires after `AUTH_TOKEN_TTL` (defaults to `7d`). Route customers to the shop and admins to the admin area based on `user.role`, while enforcing authorization on the backend too. A frontend role check is only for navigation/UI, not security.
4. Logout in the current stateless-token setup means clearing the token and auth state in the frontend. There is no logout endpoint.

For a customer-friendly shop, allow browsing and guest checkout where the commerce flow supports it. If login is needed mid-checkout, retain the intended destination/cart action and continue after successful sign-in.

## Token storage note

The API returns a bearer token in JSON; it does not set an authentication cookie. For a prototype, the frontend can keep it in memory. Avoid long-term storage in `localStorage` when possible because JavaScript-accessible tokens can be stolen by cross-site scripting. A production deployment should consider secure, HttpOnly cookies with CSRF protection, or another reviewed token-storage approach.

