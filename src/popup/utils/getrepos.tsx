

export const getrepos = ( token: string): Promise<[]> => {
 
  const myHeaders = new Headers();
  myHeaders.append("authorization", "Bearer " + token);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
      Accept: "application/vnd.github.v3+json",
      method: 'GET',
      headers: myHeaders,
  };


  return fetch(`https://api.github.com/user/repos`, requestOptions).then(res => res.json())
}