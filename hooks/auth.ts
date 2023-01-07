import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/router";
import { User } from "../context/context";

type DecodedToken = {
  username: string;
  sub: string;
  iat: number;
  exp: number;
};

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reroute, setReroute] = useState(false);
  const [token, setAccessToken] = useState("");
  const [user, setLoggedInUser] = useState<User | null>();
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("access_token");

    if (token) {
      const decodedToken: DecodedToken = jwt_decode(token);

      if (decodedToken.exp < Date.now() / 1000) {
        setAuthenticated(false);
        setReroute(true);
      } else {
        setAccessToken(token);
        setAuthenticated(true);
        //@ts-ignore
        const user = JSON.parse(Cookies.get("user"));
        setLoggedInUser(user);
      }
    } else {
      // No token found
      setReroute(true);
      setAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const logout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    setAuthenticated(false);
    router.replace("/");
    setAccessToken("");
  };

  return { authenticated, loading, logout, reroute, token, user };
};
