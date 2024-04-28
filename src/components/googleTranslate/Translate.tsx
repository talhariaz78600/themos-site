"use client"
import { useEffect, useState } from "react";
interface Language {
  label: string;
  value: string;
}
const languages: Language[] = [
    { label: 'English', value: 'en' },
    { label: 'Greek', value: 'el' },
    { label: 'Spanish', value: 'es' },
    { label: 'German', value: 'de' }
];
const includedLanguages = languages.map(lang => lang.value).join(",");
function googleTranslateElementInit() {
  new (window as any).google.translate.TranslateElement({
    pageLanguage: "auto", includedLanguages
  }, "google_translate_element");
}
export function GoogleTranslate({ prefLangCookie }: { prefLangCookie?: string }) {
  const [langCookie, setLangCookie] = useState<string>(decodeURIComponent(prefLangCookie || "en"));
  useEffect(() => {
    (window as any).googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const onChange = (value: string) => {
    const lang = "/" + value;
    setLangCookie(lang);
    const element = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (element) {
      element.value = value;
      element.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div>
             <div className="translateImg overflow-hidden relative top-0 mx-auto w-full flex justify-center ">
                {langCookie === '/el' ? (
                   <img src="/greek.jpeg" alt="Greek" className="imge z-30 w-3/4 md:w-2/5 cursor-pointer" />
              ) : (
                  <img src="/english.jpeg" alt="English" className="imge z-30 w-3/4 md:w-2/5 cursor-pointer" />
              )}
            </div>
      <div id="google_translate_element" style={{ visibility:"hidden", width: "1px", height: "1px" }}></div>
      <LanguageSelector onChange={onChange} value={langCookie} />
    </div>
  );
}
function LanguageSelector({ onChange, value }: { onChange: (value: string) => void, value: string }) {
  const langCookie = value.split("/")[2];
  return (
    
    <div className="google fixed md:right-16 right-0 top-10 z-50 overflow-hidden">
        <label htmlFor="langPicker" style={{ display: "none" }}>Lang: </label>
     <select onChange={(e) => onChange(e.target.value)} value={langCookie} style={{ width: 100}}
    className={'notranslate py-2 rounded text-blue-700 font-bold'}>
      {languages.map((it: Language) => (
        <option className="font-bold rounded text-blue-700" value={it.value} key={it.value}>
          {it.label}
        </option>
      ))}
     </select>

        </div>
  );
}




