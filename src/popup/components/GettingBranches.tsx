export const fetchBranch = async (args : { namerepo:string}) => {
  // const raw = JSON.stringify({"ref":"main" , "inputs":{"data" : args.data}})
  const token = localStorage.getItem("accesstoken")
  console.log("PushContent" , token);
  
  // const repoName = localStorage.getItem("repoName")
  // console.log("PushContent" , repoName);
  const repoName = args.namerepo
  console.log("PushContent" , repoName);

  // // const workflowId = args.id
  // console.log("PushContent" , workflowId);
  
  const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  };

  const req = await fetch(`https://api.github.com/repos/${repoName}/branches`, requestOptions)
  
  const data = await req.json();
  // console.log("Branches", data);
  
  return data
  
}