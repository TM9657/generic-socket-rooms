# This file is responsible for configuring your application
# and its dependencies with the aid of the Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
import Config

config :generic, GenericWeb.Guardian,
  allowed_algos: ["ES512"],
  secret_key: %{
    "crv" => "P-521",
    "kty" => "EC",
    "x" => System.get_env("JOKEN_PUB_KEY_X"),
    "y" => System.get_env("JOKEN_PUB_KEY_Y"),
    "d" => System.get_env("JOKEN_PUB_KEY_D")
  },
  ttl: {30, :days}



# Configures the endpoint
config :generic, GenericWeb.Endpoint,
  url: [host: "localhost"],
  api_key: System.get_env("APP_API_KEY"),
  render_errors: [
    formats: [json: GenericWeb.ErrorJSON],
    layout: false
  ],
  pubsub_server: Generic.PubSub,
  live_view: [signing_salt: "gZ/ekb3b"]

# Configures the mailer
#
# By default it uses the "Local" adapter which stores the emails
# locally. You can see the emails in your browser, at "/dev/mailbox".
#
# For production it's recommended to configure a different adapter
# at the `config/runtime.exs`.
config :generic, Generic.Mailer, adapter: Swoosh.Adapters.Local

# Configure esbuild (the version is required)
config :esbuild,
  version: "0.17.11",
  default: [
    args:
      ~w(js/app.js --bundle --target=es2017 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]

# Configure tailwind (the version is required)
config :tailwind,
  version: "3.3.2",
  default: [
    args: ~w(
      --config=tailwind.config.js
      --input=css/app.css
      --output=../priv/static/assets/app.css
    ),
    cd: Path.expand("../assets", __DIR__)
  ]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{config_env()}.exs"
