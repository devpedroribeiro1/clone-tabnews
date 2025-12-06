import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

function onError(error, request, response) {
  const publicErrorObject = new InternalServerError({
    cause: error,
  });

  console.log("Erro dentro do catch do controller: ");
  console.error(publicErrorObject);
  response.status(500).json(publicErrorObject);
}

function onNoMatch(request, response) {
  const publicErrorObject = new MethodNotAllowedError();
  response.status(405).json(publicErrorObject);
}

const controller = {
  errorHandlers: {
    onError,
    onNoMatch,
  },
};

export default controller;
