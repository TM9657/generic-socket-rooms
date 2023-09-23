defmodule GenericWeb.JwkController do
  use GenericWeb, :controller
  def show(conn, _params) do
    [{:signer_alg, _signer_alg}, {:key_map, key_map}] = Application.get_env(:joken, :pub_key)

    # ! TODO: Make sure you only return the public key
    json(conn, key_map)
  end
end
