

interface Workflow {
  id: string;
  name: string;
}
export const getWorkflows = (repoName: string, token: string): Promise<{ workflows: Workflow[] }> => {

  const myHeaders = new Headers();
  myHeaders.append("authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      method: 'GET',
      headers: myHeaders,
  };


  return fetch(`https://api.github.com/repos/${repoName}/actions/workflows`, requestOptions).then(res => res.json())
}