import retry from 'async-retry';

async function waitForServices(){
  await waitForWebService();

  async function waitForWebService(){
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage(bail, tryNumber)  {
      const response = await fetch('http://localhost:3000/api/v1/status');
      
      if(response.status !== 200){
        throw Error();
      }
    }
  }
}

export default {
  waitForServices,
}