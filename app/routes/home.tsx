import type { Route } from "./+types/home";
import LoadingPage from "../components/common/LoadingPage";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "OX PAY - Secure Payment Solutions" },
    { name: "description", content: "Secure payment solutions for modern businesses" },
  ];
}

export default function Home() {
  return <LoadingPage />;
}
