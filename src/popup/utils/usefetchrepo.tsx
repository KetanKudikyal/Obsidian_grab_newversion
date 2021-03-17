import { useEffect, useState } from "react";
import { getSyncStorage } from "./sync-storage";

const usefetchrepo = () => {
  const [repoNames, setrepoNames] = useState<[]>([]);

  async function fetchdata() {
    const TOKO = await getSyncStorage("AccessToken");
    // console.log("Token", TOKO);
    const token = TOKO.AccessToken;
    const req = await fetch("https://api.github.com/user/repos?type=owner", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${token}`,
      },
    });
    const data = await req.json();
    // console.log("adads", data);

    const Repos = data.map((reponame: any) => {
      return reponame.full_name;
    });
    // console.log("repos", Repos);

    setrepoNames(...repoNames, Repos);
  }

  useEffect(() => {
    fetchdata();
  }, []);

  // console.log("RepoNames", repoNames);

  return { repoNames };
};

export default usefetchrepo;
