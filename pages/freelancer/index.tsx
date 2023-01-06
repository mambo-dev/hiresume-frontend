import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import FreelancerLayout from "../../component/layouts/freelancer-layout";
import RequireAuth from "../../component/utils/require-auth";
import { useAuth } from "../../hooks/auth";

export default function Freelancer<NextPageWithLayout>() {
  let { authenticated, reroute, loading } = useAuth();

  const router = useRouter();

  if (!authenticated) {
    setTimeout(() => {
      if (!loading) {
        router.replace("/auth/login");
      }
    }, 3000);

    return <RequireAuth reroute={reroute} loading={loading} />;
  }

  return <div>freelancer</div>;
}

Freelancer.getLayout = function getLayout(page: ReactElement) {
  return <FreelancerLayout>{page}</FreelancerLayout>;
};
