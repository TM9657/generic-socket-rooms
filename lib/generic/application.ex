defmodule Generic.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    topologies = Application.get_env(:libcluster, :topologies) || []
    children = [
      # Start the Telemetry supervisor
      GenericWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Generic.PubSub},
      # Start Finch
      {Finch, name: Generic.Finch},
      # Start the Endpoint (http/https)
      GenericWeb.Endpoint,
      {Cluster.Supervisor, [topologies, [name: Generic.ClusterSupervisor]]}
      # Start a worker by calling: Generic.Worker.start_link(arg)
      # {Generic.Worker, arg}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Generic.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    GenericWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
