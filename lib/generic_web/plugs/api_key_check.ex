defmodule GenericWeb.Plugs.ApiKeyCheck do
  import Plug.Conn

  def init(_opts), do: nil

  def call(conn, _opts) do
    config_key = Application.get_env(:generic, GenericWeb.Endpoint)[:api_key]

    case get_req_header(conn, "authorization") do
      api_key when api_key == [config_key] ->
        conn
      _ ->
        conn
        |> send_resp(403, "Forbidden")
        |> halt()
    end
  end
end
