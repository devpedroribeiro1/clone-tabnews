describe("POST /api/v1/status should return 200", () => {
  describe("Anonymous user", () => {
    test("Retrieving system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      const responseBody = await response.json();

      expect(response.status).toBe(405);
      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Método não permitido para este endpoint",
        action: "Verifique os métodos HTTP válidos para este endpoint.",
        status_code: 405,
      });
    });
  });
});
