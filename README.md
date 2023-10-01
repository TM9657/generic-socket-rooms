<a href="https://tm9657.de?ref=github"><p align="center"><img width=250 src="https://cdn.tm9657.de/tm9657/images/generic_socket_rooms.png" /></p></a>
<p align="center">
    <a href="https://tm9657.de"><img src="https://img.shields.io/badge/website-more_from_us-C0222C.svg?style=flat&logo=PWA"> </a>
	  <a href="https://discord.ca9.io"><img src="https://img.shields.io/discord/673169081704120334?label=discord&style=flat&color=5a66f6&logo=Discord"></a>
	  <a href="https://twitter.com/tm9657"><img src="https://img.shields.io/badge/twitter-follow_us-1d9bf0.svg?style=flat&logo=Twitter"></a>
	  <a href="https://www.linkedin.com/company/tm9657/"><img src="https://img.shields.io/badge/linkedin-connect-0a66c2.svg?style=flat&logo=Linkedin"></a>
    <a href="https://merch.ca9.io"><img src="https://img.shields.io/badge/merch-support_us-red.svg?style=flat&logo=Spreadshirt"></a>
</p>

# Generic Socket Rooms
Generic, scalable websocket server that should support most use-cases. It comes with a client library that can be installed via

`npm install @tm9657/socket-client`

We are using Elixir / Phoenix to use the language specific features and mitigate the use for Redis adapters (KISS) for scaling across multiple instances.

Access to rooms is managed via JWT. The server is able to return signed JWT based on your API-Key. However you can also use our [JWK Store](https://github.com/TM9657/jwk-store) (serverless) to implement rolling keys or sign the tokens in other services.

The token should have the following claims:
```
{
  "sub": "user id",
  "room_name": "the room this token gives access to",
  "type": "room | signaling"
}
```

Generally the following rooms are possible: `room:*`, `pm:<sub>` and `signaling:*`

### API
```
> GET "/v1/api/jwk" - returns the current public key (remove this if you use symmetric keys)
```
```
> POST "/v1/api/auth/jwk_sign" - signs a new JWT that is valid for 30 days (REQUIRES API-KEY)

body: {
	"room_name": "room id (without prefix room or signaling)",
	"sub": "<user-id>",
	"type": "room|signaling"
}
```

```
> GET "/v1/api/verify" checks the auth header token for validity
```

### Development Server:

  * Run `mix setup` to install and setup dependencies
  * Start Phoenix endpoint with `mix phx.server` or inside IEx with `iex -S mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

### Deploy to Fly
To deploy to fly use the following commands:
1. `bun run fly`
2. adjust your newly created `fly.toml`
3. `bun run deploy`

---
**Provided by TM9657 GmbH with ❤️**
### Check out some of our products:
- [Kwirk.io](https://kwirk.io?ref=github) (Text Editor with AI integration, privacy focus and offline support)