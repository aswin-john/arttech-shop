# ArtTech backend

This is the new backend entry point. Product browsing is public. Registration and login are public. Login returns a role-bearing token and a role-specific `redirectTo` value (`/admin` for admins, `/` for customers).

## Setup

1. Install Node.js and MongoDB (local or hosted).
2. Copy `.env.example` to `.env` and set `DATABASE`, `CLIENT_ORIGIN`, and a private `AUTH_TOKEN_SECRET` with at least 32 characters.
3. From this folder run `npm install`, then `npm run dev`.

The API listens on port 5000 by default.

## Routes

| Method | Path | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/products` | Public | Placeholder for the product catalogue |
| POST | `/api/auth/register` | Public | Create an account; returns user and bearer token |
| POST | `/api/auth/login` | Public | Sign in; returns user and bearer token |

Registration and login accept JSON. Public registration always creates a `user` role; never pass a role from the browser. Example:

```json
{ "name": "Akhil", "email": "buyer@example.com", "password": "at-least-8-chars" }
```

Send the returned token on protected requests as `Authorization: Bearer <token>`. Its verified claims are available as `req.auth.userId` and `req.auth.role`. The frontend can keep its intended destination/action after redirecting an unauthenticated customer to login, then continue after login. A logout in this first stateless-token version means clearing the token in the frontend.

## Next shopping features

Add product and cart models, then protect cart mutation, order creation, and checkout routes with `requireAuth`. Read the customer id from `req.auth.userId`; never accept ownership from a client-supplied `userId`. Keep product list and detail routes public. For production, use HTTPS and consider moving sessions into secure, HttpOnly cookies with CSRF protection.
