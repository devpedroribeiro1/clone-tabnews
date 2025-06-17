import retry from 'async-retry';

async function waitForServices(){
  await waitForWebService();

  async function waitForWebService(){
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage(bail, tryNumber)  {
      console.log(tryNumber)
      const response = await fetch('http://localhost:3000/api/v1/status');
      await response.json();
    }
  }
}

export default {
  waitForServices,
}