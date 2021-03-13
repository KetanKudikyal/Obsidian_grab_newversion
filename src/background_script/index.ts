// export const getting_workflows = async (name: string) => {


//   const token = localStorage.getItem("accesstoken");
//   console.log("getting_Workflow", name);

//   const req = await fetch(
//     `https://api.github.com/repos/${name}/actions/workflows?type=owner`,
//     {
//       headers: {
//         Accept: "application/vnd.github.v3+json",
//         Authorization: `token ${token}`,
//       },
//     }
//   );
//   const data = await req.json();
//   if (data.workflows.length == 0) {
//     console.log("Github Workflow not found");
//   } else {
//     console.log(data.workflows);
//     console.log(data.workflows[0].id);
//   }
// };

// export const signoutfromgithub = () => {
//   localStorage.removeItem("accesstoken");
//   auth.signOut();
// };

// export const getgithubdata = async () => {
//   const token = localStorage.getItem("accesstoken");
//   console.log("ABye", token);
//   const req = await fetch("https://api.github.com/user/repos?type=owner", {
//     headers: {
//       Accept: "application/vnd.github.v3+json",
//       Authorization: `token ${token}`,
//     },
//   });
//   const data = await req.json();
//   console.log(data);
// };

// const polling = () => {
//   console.log("polling");
//   setTimeout(polling, 1000 * 30);
// };


// polling();
chrome.browserAction.onClicked.addListener(function(tab) {
  alert('working?');
});