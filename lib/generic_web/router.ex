defmodule GenericWeb.Router do
  use GenericWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug GenericWeb.Plugs.ApiKeyCheck
  end

  scope "/v1/api", GenericWeb do
    pipe_through :api

    get "/jwk", JwkController, :show
    get "/verify", JwkVerifyController, :show
  end

  scope "/v1/api/auth", GenericWeb do
    pipe_through [:api, :auth]
    post "/jwk_sign", JwkSignController, :show
    get "/", DefaultController, :show
  end

  scope "/v1", GenericWeb do
    get "/", DefaultController, :show
  end

  scope "/v1/socket", GenericWeb do
    get "/", DefaultController, :show
  end



  # Enable LiveDashboard and Swoosh mailbox preview in development
  if Application.compile_env(:generic, :dev_routes) do
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    import Phoenix.LiveDashboard.Router

    scope "/v1/dev" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: GenericWeb.Telemetry
      forward "/mailbox", Plug.Swoosh.MailboxPreview
    end
  end
end
