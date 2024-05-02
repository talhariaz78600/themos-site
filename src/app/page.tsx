// import Image from "next/image";
import PageHome from "@/components/home/PageHome";
import {GoogleTranslate} from "@/components/googleTranslate/Translate"
import Footer from "@/components/Footer/Footer";
export default function Home() {
  return (
    <div>
      <GoogleTranslate/>
      <PageHome />
      <Footer/>
    </div>
  );
}
