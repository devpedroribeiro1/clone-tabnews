import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

const statusEndpoint = "/api/v1/status";
const loadingText = "Carregando...";
const failedFetchText = "Dado não encontrado.";

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseInfo />
    </>
  );
}

function UpdatedAt() {
  const { data, isLoading } = useSWR(statusEndpoint, fetchAPI, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });

  let updatedAtText = loadingText;

  if (!isLoading) {
    updatedAtText = data?.updated_at ?? failedFetchText;
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseInfo() {
  const { data, isLoading } = useSWR(statusEndpoint, fetchAPI, {
    refreshInterval: 1000,
    dedupingInterval: 1000,
  });

  let placeholderText = loadingText;
  let databaseInfo;

  if (!isLoading) {
    databaseInfo = data?.dependencies?.database;
    if (!databaseInfo) {
      placeholderText = failedFetchText;
    }
  }

  return (
    <div>
      <h2>Status do banco de dados</h2>
      <div>
        Versão do servidor: {databaseInfo?.server_version ?? placeholderText}
        <br />
        Conexões abertas: {databaseInfo?.opened_connections ?? placeholderText}
        <br />
        Conexões máximas: {databaseInfo?.max_connections ?? placeholderText}
      </div>
    </div>
  );
}
