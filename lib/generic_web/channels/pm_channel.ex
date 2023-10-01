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

  def handle_in("pm", payload, socket) do
    sub = socket.assigns.sub
    receiver = Map.get(payload, "receiver")
    message = Map.put(payload, "sender", sub)
    GenericWeb.Endpoint.broadcast("pm:#{receiver}", "pm", message)
    {:noreply, socket}
  end
end
