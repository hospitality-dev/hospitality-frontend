import ky from "ky";

export async function getLoginRoute() {
  const res = await ky
    .post<{ auth_url: string; state: string }>("http://localhost:4000/auth/login", {
      credentials: "include",
    })
    .json();

  localStorage.setItem("state", res.state);
  window.location.assign(res.auth_url);
}
