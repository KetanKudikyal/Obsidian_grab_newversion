export const pushContent = (args : { data : string , id :number}) => {
  const raw = JSON.stringify({"ref":"master" , "inputs":{"data" : args.data}})
  const token = localStorage.getItem("accessToken")
  const repoName = localStorage.getItem("repoName")
  const workflowId = args.id
  
  const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
  };
  
  return fetch(`https://api.github.com/repos/${repoName}/actions/workflows/${workflowId}/dispatches`, requestOptions)

}