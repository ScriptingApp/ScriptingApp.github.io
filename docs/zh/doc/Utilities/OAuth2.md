---
title: OAuth2

---

`OAuth2` 类用于在脚本中实现 OAuth 2.0 授权流程。它支持标准的授权码流程、PKCE（Proof Key for Code Exchange）、访问令牌续期及多种配置选项。

---

## 构造函数

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

### 参数说明

| 参数名            | 类型     | 是否必填 | 说明                                                       |
| -------------- | ------ | ---- | -------------------------------------------------------- |
| consumerKey    | string | 是    | 应用的客户端 ID（Client ID）或 Consumer Key。                      |
| consumerSecret | string | 是    | 应用的客户端密钥（Client Secret）。                                 |
| authorizeUrl   | string | 是    | 用于跳转用户授权的地址。                                             |
| accessTokenUrl | string | 否    | 获取访问令牌（Access Token）的地址，若不提供则使用 authorizeUrl。            |
| responseType   | string | 是    | 一般为 `"code"`，表示使用授权码流程。                                  |
| contentType    | string | 否    | 请求令牌时使用的内容类型，默认值为 `"application/x-www-form-urlencoded"`。 |

### 抛出错误

* 当配置参数无效或实例化失败时抛出错误。

---

## 属性

### `accessTokenBasicAuthentification: boolean`

是否使用 Basic 认证方式发送获取访问令牌的请求。默认值为 `false`。

---

### `allowMissingStateCheck: boolean`

是否禁用 `state` 参数校验（CSRF 保护）。**谨慎使用**，默认值为 `false`。

---

### `encodeCallbackURL: boolean`

是否对回调地址进行 URL 编码。某些服务商要求必须编码。默认值为 `true`。

---

### `encodeCallbackURLQuery: boolean`

是否对整个回调地址的查询参数进行编码。部分服务如 Imgur 要求此值为 `false`。默认值为 `true`。

---

## 方法

### `authorize(options): Promise<OAuthCredential>`

发起 OAuth2 授权流程。将打开一个浏览器窗口，供用户登录并授权。

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

#### 参数说明

| 参数名                 | 类型                      | 是否必填 | 说明                                                |
| ------------------- | ----------------------- | ---- | ------------------------------------------------- |
| callbackURL         | string                  | 否    | 授权成功后的回调地址，默认为 `scripting://oauth_callback/脚本名称`。 |
| scope               | string                  | 是    | 空格分隔的权限列表。                                        |
| state               | string                  | 是    | 防止 CSRF 攻击的随机字符串。                                 |
| parameters          | Record\<string, any>    | 否    | 附加的授权请求参数。                                        |
| headers             | Record\<string, string> | 否    | 附加的请求头。                                           |
| codeVerifier        | string                  | 条件必填 | PKCE 流程中使用的随机码。                                   |
| codeChallenge       | string                  | 条件必填 | 由 `codeVerifier` 生成的哈希值。                          |
| codeChallengeMethod | `"plain"` \| `"S256"`   | 条件必填 | PKCE 中的 challenge 加密方法，默认使用 `"S256"`。             |

#### 返回值

* 返回一个包含授权结果的 `OAuthCredential` 对象。

#### 抛出错误

* 若用户拒绝授权或网络错误将抛出异常。

#### 示例

```ts
const oauth = new OAuth2({
  consumerKey: '你的客户端ID',
  consumerSecret: '你的客户端密钥',
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

使用刷新令牌（refresh token）重新获取访问令牌。

```ts
renewAccessToken(options: {
  refreshToken: string
  parameters?: Record<string, any>
  headers?: Record<string, string>
}): Promise<OAuthCredential>
```

#### 参数说明

| 参数名          | 类型                      | 是否必填 | 说明             |
| ------------ | ----------------------- | ---- | -------------- |
| refreshToken | string                  | 是    | 上一次授权返回的刷新令牌。  |
| parameters   | Record\<string, any>    | 否    | 额外的 POST 请求参数。 |
| headers      | Record\<string, string> | 否    | 自定义请求头。        |

#### 返回值

* 返回新的 `OAuthCredential` 对象。

#### 抛出错误

* 若刷新失败（如刷新令牌已过期），则抛出错误。

#### 示例

```ts
const newCredential = await oauth.renewAccessToken({
  refreshToken: oldCredential.oauthRefreshToken
})

console.log(newCredential.oauthToken)
```

---

## OAuthCredential 类型定义

授权成功后返回的凭证对象包含以下字段：

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

### 字段说明

| 字段名                 | 类型             | 说明                                       |
| ------------------- | -------------- | ---------------------------------------- |
| oauthToken          | string         | 用于访问资源的 Access Token。                    |
| oauthTokenSecret    | string         | 与访问令牌配套使用的 Token Secret，常用于 OAuth1.0 流程。 |
| oauthRefreshToken   | string         | 用于获取新访问令牌的 Refresh Token。                |
| oauthTokenExpiresAt | number \| null | 访问令牌的过期时间（Unix 毫秒时间戳），若无过期则为 `null`。     |
| oauthVerifier       | string         | 在 PKCE 流程中使用的授权码验证器。                     |
| version             | string         | OAuth 协议版本（例如 `"2.0"`）。                  |
| signatureMethod     | string         | 请求签名方式（如 `"HMAC-SHA1"`、`"PLAINTEXT"`）。   |

---

## 使用建议

* 始终使用 `state` 参数防止 CSRF 攻击，除非明确关闭。
* 使用 `Script.createOAuthCallbackURLScheme(name)` 为脚本生成唯一回调地址。
* 若需要长期授权，请妥善保存 `oauthRefreshToken`。
* 对于公用客户端建议启用 PKCE 增强安全性。
