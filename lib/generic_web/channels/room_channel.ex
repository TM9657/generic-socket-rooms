defmodule GenericWeb.RoomChannel do
  use Phoenix.Channel

  def join("room:" <> room_id, %{"token" => token}, socket) do
    {status, claims} = GenericWeb.Guardian.decode_and_verify(token)
    if status != :ok do
      {:error, %{reason: "unauthorized"}}
    end
    %{"sub" => _, "room_name" => room_name, "type" => type} = claims
    if room_id != room_name || type != "room" do
      {:error, %{reason: "unauthorized"}}
    end

    {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end
end
