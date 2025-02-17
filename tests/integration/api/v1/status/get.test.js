test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json()

  // espera que o status recebido do servidor seja 200
  expect(response.status).toBe(200);

  // espera que a chave updated_at seja válida no padrão ISO 8601
  const parsedDate = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedDate);

  //espera que a versão do postgres seja 16.0
  expect(responseBody.database_info.server_version).toEqual("16.0");

  //espera que o máximo de conexões do postgres exista(não sei como aumentar a cobertura)
  expect(responseBody.database_info.max_connections).toBeDefined();

  // espera que o "conexões atuais" exista
  expect(responseBody.database_info.current_connections).toBeDefined();
  // espera que o "conexões atuais" seja menor que o "conexões máximas"
  expect(parseInt(responseBody.database_info.current_connections))
  .toBeLessThan(parseInt(responseBody.database_info.max_connections))
})