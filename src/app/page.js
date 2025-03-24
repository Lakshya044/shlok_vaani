import Landing_Page from "@/components/Dashboard/home";
import { SessionProvider } from "next-auth/react";
import Outer_Navbar from "@/components/Outer_Navbar";
import Outer_Footer from "@/components/Outer_Footer";

export default function Home() {
  return (
    <>
      <SessionProvider>
        <Outer_Navbar />
        <Landing_Page/>
        <Outer_Footer />
      </SessionProvider>
    </>
  );
}
