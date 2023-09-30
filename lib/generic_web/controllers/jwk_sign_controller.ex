defmodule GenericWeb.JwkSignController do
  require Logger
  use GenericWeb, :controller
  def show(conn, params) do
    %{"sub" => sub, "room_name" => room_name} = params
    {err, token, _} = GenericWeb.Guardian.encode_and_sign(%{
      "sub" => sub,
    },
    %{
      "room_name" => room_name
    })
    if err == :ok do
      json(conn, token)
    else
      json(conn, %{"error" => "Could not sign token"})
    end
  end
end
