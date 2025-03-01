import { Navigate } from "@tanstack/react-router";

type Props = {
  handleLogin: () => void;
  authenticated: boolean | null;
};
export function Login({ authenticated, handleLogin }: Props) {
  return (
    <div>
      {authenticated === null && <div>Loading...</div>}
      {authenticated === false && (
        <div>
          <button
            onClick={() => {
              // Perform the authorization request, including the code challenge
              handleLogin();
            }}>
            Login
          </button>
        </div>
      )}
      {authenticated && <Navigate to="/" />}
    </div>
  );
}
