import Landing_Page from "@/components/Dashboard/home";
import { SessionProvider } from "next-auth/react";

export default function Home() {
  return (
    <>
      <SessionProvider>
        <Landing_Page/>
      </SessionProvider>
    </>
  );
}
