defmodule GenericWeb.DefaultController do
  use GenericWeb, :controller
  def show(conn, _params) do
    json(conn, %{
      version: "0.1",
      github: "https://github.com/TM9657/generic-socket-rooms",
      sponsored_by: "https://tm9657.de"
    })
  end
end
