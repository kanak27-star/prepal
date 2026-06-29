export default function useAuth() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return { logout };
}