defmodule GenericWeb.RoomChannel do
  use Phoenix.Channel
  import Logger
  def join("room:" <> room_id, %{"params" => %{"token" => token}}, socket) do
    {:ok, claims} = GenericWeb.Guardian.decode_and_verify(token)
    %{"sub" => _, "room_name" => room_name, "type" => type} = claims
    if room_name == room_id && type == "room" do
      {:ok, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  def handle_in(event, payload, socket) do
    sub = socket.assigns.sub
    message = Map.put(payload, "sender", sub)
    broadcast!(socket, event, message)
    {:noreply, socket}
  end
end
