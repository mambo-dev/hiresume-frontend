import axios from "axios";
import jwt_decode from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import { DecodedToken } from "../..";
import BidLayout from "../../../../component/bid/bid-layout";
import ClientLayout from "../../../../component/layouts/client-layout";

export default function AcceptedBids({ data }: any) {
  const { bids, token, error, user } = data;

  return (
    <div className="w-full h-full min-h-screen  flex items-center justify-center ">
      <div className=" w-full h-full sm:w-3/4  py-12 px-2 shadow-md grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {bids?.map((bid: any, index: number) => (
          <BidLayout bid={bid} key={index} />
        ))}
      </div>
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

AcceptedBids.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout>{page}</ClientLayout>;
};
