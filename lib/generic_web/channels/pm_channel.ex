defmodule GenericWeb.PMChannel do
  use Phoenix.Channel

  def join("pm:" <> sub, %{"params" => %{"token" => token}}, socket) do
    {:ok, claims} = GenericWeb.Guardian.decode_and_verify(token)
    %{"sub" => token_sub, "room_name" => _, "type" => _} = claims
    if token_sub == sub do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end
end
