import { useRouter } from "next/router";
import { DecodedToken } from "../client";
import jwt_decode from "jwt-decode";
import axios from "axios";

export default function Job({ data }: any) {
  const { user, job, error } = data;
  console.log(job);
  const router = useRouter();
  if (error?.message.length > 0) {
    setTimeout(() => {
      router.replace("/auth/login");
    }, 3000);

    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-fit py-10 shadow px-4 border border-gray-200 rounded  flex items-center flex-col gap-y-2">
          <p className="font-bold text-red-500">
            Kindly log in to access resource if problem persists contact admin
          </p>
        </div>
      </div>
    );
  }
  return <div>{job.job_title}</div>;
}

export async function getServerSideProps<GetServerSideProps>(context: any) {
  try {
    const { req } = context;
    const { id } = context.query;
    console.log(id);
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

    const getJob = await axios.get(
      `http://localhost:4000/explores/get-job/${id}`,
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
          job: getJob.data,
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
