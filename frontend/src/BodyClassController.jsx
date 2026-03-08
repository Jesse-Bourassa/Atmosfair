import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function BodyClassController() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isAdmin =
      pathname.toLowerCase().startsWith("/admin") ||
      pathname.toLowerCase().startsWith("/admin/dashboard") ||
      pathname.toLowerCase().startsWith("/admin/customer");

    document.body.classList.toggle("bg-admin", isAdmin);
    document.body.classList.toggle("bg-public", !isAdmin);
  }, [pathname]);

  return null;
}