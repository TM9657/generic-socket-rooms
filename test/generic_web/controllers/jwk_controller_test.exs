defmodule GenericWeb.JwkControllerTest do
  use GenericWeb.ConnCase

  import Generic.ApiFixtures

  alias Generic.Api.Jwk

  @create_attrs %{

  }
  @update_attrs %{

  }
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all jwk", %{conn: conn} do
      conn = get(conn, ~p"/api/jwk")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create jwk" do
    test "renders jwk when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/jwk", jwk: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/jwk/#{id}")

      assert %{
               "id" => ^id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/jwk", jwk: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update jwk" do
    setup [:create_jwk]

    test "renders jwk when data is valid", %{conn: conn, jwk: %Jwk{id: id} = jwk} do
      conn = put(conn, ~p"/api/jwk/#{jwk}", jwk: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/jwk/#{id}")

      assert %{
               "id" => ^id
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, jwk: jwk} do
      conn = put(conn, ~p"/api/jwk/#{jwk}", jwk: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete jwk" do
    setup [:create_jwk]

    test "deletes chosen jwk", %{conn: conn, jwk: jwk} do
      conn = delete(conn, ~p"/api/jwk/#{jwk}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/jwk/#{jwk}")
      end
    end
  end

  defp create_jwk(_) do
    jwk = jwk_fixture()
    %{jwk: jwk}
  end
end
