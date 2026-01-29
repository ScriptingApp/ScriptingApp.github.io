---
title: OAuth2
description: This interface provides a simple way to authenticate users and authorize access to resources using OAuth2 protocol.

---

The `OAuth2` class provides a robust interface for managing OAuth 2.0 authorization flows in Scripting. It supports standard authorization code flows, PKCE (Proof Key for Code Exchange), access token renewal, and customizable token handling.

---

## Constructor

```ts
new OAuth2(options: {
  consumerKey: string
  consumerSecret: string
  authorizeUrl: string
  accessTokenUrl?: string
  responseType: string
  contentType?: string
})
```

### Parameters

| Name           | Type   | Required | Description                                                                         |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------- |
| consumerKey    | string | Yes      | The application's client ID or consumer key.                                        |
| consumerSecret | string | Yes      | The application's client secret.                                                    |
| authorizeUrl   | string | Yes      | The URL where the user will be redirected for authorization.                        |
| accessTokenUrl | string | No       | The endpoint to request the access token. If omitted, `authorizeUrl` is used.       |
| responseType   | string | Yes      | Typically `"code"` for the Authorization Code Grant flow.                           |
| contentType    | string | No       | Content type for token requests. Defaults to `"application/x-www-form-urlencoded"`. |

### Throws

* Error if the configuration is invalid or instantiation fails.

---

## Properties

### `accessTokenBasicAuthentification: boolean`

Enable this to use HTTP Basic authentication when exchanging the authorization code for an access token. Default is `false`.

---

### `allowMissingStateCheck: boolean`

Disables CSRF protection based on state parameter validation. **Use with caution.** Default is `false`.

---

### `encodeCallbackURL: boolean`

Encodes the callback URL when generating the authorization URL. Required by some providers. Default is `true`.

---

### `encodeCallbackURLQuery: boolean`

Controls whether the entire query string is encoded. Some services (e.g., Imgur) require this to be `false`. Default is `true`.

---

## Methods

### `authorize(options): Promise<OAuthCredential>`

Initiates the OAuth2 authorization flow, opening a browser window for the user to log in and grant permissions.

```ts
authorize(options: {
  callbackURL?: string
  scope: string
  state: string
  parameters?: Record<string, any>
  headers?: Record<string, string>
} & ({
  codeVerifier: string
  codeChallenge: string
  codeChallengeMethod: string
} | {
  codeVerifier?: never
  codeChallenge?: never
  codeChallengeMethod?: never
})): Promise<OAuthCredential>
```

#### Parameters

| Name                | Type                    | Required    | Description                                                                               |
| ------------------- | ----------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| callbackURL         | string                  | No          | Custom redirect URI. Default is `scripting://oauth_callback/{current_script_encoded_name}`. |
| scope               | string                  | Yes         | Space-separated list of requested scopes.                                                 |
| state               | string                  | Yes         | A unique string used to prevent CSRF attacks.                                             |
| parameters          | Record\<string, any>    | No          | Extra query parameters to send in the authorization request.                              |
| headers             | Record\<string, string> | No          | Extra headers to send in the request.                                                     |
| codeVerifier        | string                  | Conditional | Raw random string used in PKCE flow.                                                      |
| codeChallenge       | string                  | Conditional | Hashed version of the code verifier.                                                      |
| codeChallengeMethod | "plain" \| "S256"       | Conditional | Hashing method for code challenge. Default is `"S256"`.                                   |

#### Returns

* A Promise that resolves to an `OAuthCredential` object containing tokens and metadata.

#### Throws

* Error if the user denies authorization or a network/response error occurs.

#### Example

```ts
const oauth = new OAuth2({
  consumerKey: 'your-client-id',
  consumerSecret: 'your-client-secret',
  authorizeUrl: 'https://provider.com/oauth/authorize',
  accessTokenUrl: 'https://provider.com/oauth/token',
  responseType: 'code'
})

const credential = await oauth.authorize({
  scope: 'profile email',
  state: 'secure_random_state',
  callbackURL: Script.createOAuthCallbackURLScheme('my_oauth_script')
})

console.log(credential.oauthToken)
```

---

### `renewAccessToken(options): Promise<OAuthCredential>`

Exchanges a refresh token for a new access token from the provider.

```ts
renewAccessToken(options: {
  refreshToken: string
  parameters?: Record<string, any>
  headers?: Record<string, string>
}): Promise<OAuthCredential>
```

#### Parameters

| Name         | Type                    | Required | Description                            |
| ------------ | ----------------------- | -------- | -------------------------------------- |
| refreshToken | string                  | Yes      | The refresh token previously obtained. |
| parameters   | Record\<string, any>    | No       | Additional POST body parameters.       |
| headers      | Record\<string, string> | No       | Additional headers for the request.    |

#### Returns

* A Promise that resolves to an updated `OAuthCredential` object.

#### Throws

* Error if the refresh fails due to expired or revoked tokens.

#### Example

```ts
const newCredential = await oauth.renewAccessToken({
  refreshToken: previous.oauthRefreshToken
})

console.log(newCredential.oauthToken)
```

---

## OAuthCredential Type

The `OAuthCredential` object contains all relevant information from a successful OAuth2 transaction.

```ts
type OAuthCredential = {
  oauthToken: string
  oauthTokenSecret: string
  oauthRefreshToken: string
  oauthTokenExpiresAt: number | null
  oauthVerifier: string
  version: string
  signatureMethod: string
}
```

### Field Descriptions

| Field               | Type           | Description                                                      |
| ------------------- | -------------- | ---------------------------------------------------------------- |
| oauthToken          | string         | Access token to authorize requests to the API.                   |
| oauthTokenSecret    | string         | Token secret for request signing (used in OAuth1.0-like flows).  |
| oauthRefreshToken   | string         | Token used to refresh the access token.                          |
| oauthTokenExpiresAt | number \| null | Expiration time in Unix timestamp (ms). `null` if no expiration. |
| oauthVerifier       | string         | Verifier used for PKCE validation.                               |
| version             | string         | OAuth version (e.g., "2.0").                                     |
| signatureMethod     | string         | Method used to sign requests (e.g., "HMAC-SHA1", "PLAINTEXT").   |

---

## Best Practices

* Always verify `state` to protect against CSRF attacks unless explicitly disabled.
* Use `Script.createOAuthCallbackURLScheme(name)` to generate script-specific callback URLs.
* Securely store the `oauthRefreshToken` if long-term access is needed.
* Consider using PKCE for enhanced security, especially in public clients.
