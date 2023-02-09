import axios from "axios";
import { DecodedToken } from "..";
import jwt_decode from "jwt-decode";
export default function Contract({ data }: any) {
  const { user, contract, error, token } = data;
  console.log(contract);
  return <div></div>;
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  try {
    const { req } = context;
    const { id } = context.query;

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

    const getContract = await axios.get(
      `http://localhost:4000/explores/contract/${id}`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${req.cookies.access_token}`,
        },
      }
    );

    return {
      props: {
        data: {
          contract: getContract.data,
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
          job: null,
          token: null,
          error: {
            message: error.message,
          },
        },
      },
    };
  }
}
