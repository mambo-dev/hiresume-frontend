import React, { ReactElement } from "react";
import FreelancerLayout from "../../component/layouts/freelancer-layout";

export default function Freelancer<NextPageWithLayout>() {
  return <div>freelancer</div>;
}

Freelancer.getLayout = function getLayout(page: ReactElement) {
  return <FreelancerLayout>{page}</FreelancerLayout>;
};
