defmodule GenericWeb.PMChannel do
  use Phoenix.Channel

  def join("pm:" <> sub, %{"token" => token}, socket) do
    {status, claims} = GenericWeb.Guardian.decode_and_verify(token)
    if status != :ok do
      {:error, %{reason: "unauthorized"}}
    end

    %{"sub" => token_sub, "room_name" => _, "type" => _} = claims
    if token_sub != sub do
      {:error, %{reason: "unauthorized"}}
    end

    {:ok, socket}
  end

  def handle_in("new_msg", %{"body" => body}, socket) do
    broadcast!(socket, "new_msg", %{body: body})
    {:noreply, socket}
  end
end
