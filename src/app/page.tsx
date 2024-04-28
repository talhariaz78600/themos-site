// import Image from "next/image";
import PageHome from "@/components/home/PageHome";
import {GoogleTranslate} from "@/components/googleTranslate/Translate"
export default function Home() {
  return (
    <div>
      <GoogleTranslate/>
      <PageHome />
    </div>
  );
}
