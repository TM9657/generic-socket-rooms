defmodule GenericWeb.JwkController do
  use GenericWeb, :controller
  import Logger
  def show(conn, _params) do
    config = GenericWeb.Guardian.config(:secret_key)
    key_map_without_d = Map.delete(config, "d")
    json(conn, key_map_without_d)
  end
end
