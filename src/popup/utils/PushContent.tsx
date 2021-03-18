import { AppCredentials } from "./useToken";

export const pushContent = async (args: AppCredentials & { data: string }) => {
  
  const raw = JSON.stringify({"ref":args.branch , "inputs":{"data" : args.data}})
  
  const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${args.token}`);
    myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  
  return fetch(`https://api.github.com/repos/${args.repoName}/actions/workflows/${args.workflowId}/dispatches`, requestOptions)

}