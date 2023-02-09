import axios from "axios";
import jwt_decode from "jwt-decode";
import { DecodedToken } from "../..";

export default function AcceptedBids({ data }: any) {
  const { bids, token, error, user } = data;

  return (
    <div>
      {bids?.map((bid: any, index: number) => (
        <div key={bid}>bid</div>
      ))}
    </div>
  );
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  try {
    const { req } = context;
    const { aid } = context.query;
    const user = JSON.parse(req.cookies.user);
    if (!req.cookies.access_token) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    const decodedToken: DecodedToken = jwt_decode(req.cookies.access_token);

    if (decodedToken.exp < Date.now() / 1000) {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    if (user.user_role !== "client") {
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }

    const acceptedBids = await axios.get(
      `http://localhost:4000/clients/get-accepted-bids/${aid}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    console.log("bids", acceptedBids.data);

    return {
      props: {
        data: {
          bids: acceptedBids.data,
          token: req.cookies.access_token,
          error: null,
          user: user,
        },
      },
    };
  } catch (error: any) {
    return {
      props: {
        data: {
          user: null,
          bids: null,
          token: null,
          error: {
            message: error.message,
          },
        },
      },
    };
  }
}
