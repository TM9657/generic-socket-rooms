defmodule GenericWeb.JwkVerifyController do
  require Logger
  use GenericWeb, :controller

  def show(conn, _params) do
    auth_header = get_req_header(conn, "authorization")
    case auth_header do
      [token] ->
        {status, _} = GenericWeb.Guardian.decode_and_verify(token)
        if status == :ok do
          json(conn, %{"message" => "Token is valid"})
        else
          json(conn, %{"message" => "Token is invalid"})
        end
      _ ->
        json(conn, %{"message" => "Token is invalid"})
    end
  end
end
