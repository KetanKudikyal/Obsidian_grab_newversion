import { getSyncStorage } from "./sync-storage";

export const pushContent = async (args : { data : string , id :number , repoName:string , Bname:string}) => {
  const raw = JSON.stringify({"ref":args.Bname , "inputs":{"data" : args.data}})
  const TOKO = await getSyncStorage("AccessToken")
    console.log("Token" , TOKO);
  const token = TOKO.AccessToken
  console.log("PushContent" , token);
  
  // const repoName = localStorage.getItem("repoName")
  // console.log("PushContent" , repoName);
  const repoName = args.repoName
  const workflowId = args.id
  console.log("PushContent" , workflowId);
  
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