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




// // Import the CSS for rsuite here if needed
// const Translate = () => {
//     const languages = [
//         { label: 'English', value: '/auto/en' },
//         { label: 'Greek', value: '/auto/el' },
//         { label: 'Spanish', value: '/auto/es' },
//         { label: 'German', value: '/auto/de' },
//     ];
//     const [selected, setSelected] = useState<string | null>();

//     useEffect(() => {
//         const googleTranslateElementInit = () => {
//             new window.google.translate.TranslateElement(
//                 {
//                     pageLanguage: 'auto',
//                     autoDisplay: false,
//                     includedLanguages: 'el,en,es,de',
//                     layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
//                 },
//                 'google_translate_element'
//             );
//         };

//         const addScript = document.createElement('script');
//         addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
//         document.body.appendChild(addScript);
//         window.googleTranslateElementInit = googleTranslateElementInit;

//         if (hasCookie('googtrans')) {
//             setSelected(getCookie('googtrans'));
//         } else {
//             setSelected('/auto/en');
//         }
//     }, []);

//     const langChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//         const newSelected = event.target.value;

//         if (newSelected !== selected) {
//             setSelected(newSelected);
//             // window.location.reload();
//         }
//     };

//     const openPdfInNewTab = () => {
//         window.open('https://drive.google.com/file/d/1EX500FDAqoOlELSStTPCw012Gt6MvFEC/view?usp=sharing', '_blank');
//     };

//     return (
//         <>
      
//             <div className="translateImg overflow-hidden relative top-0 mx-auto w-full flex justify-center ">
//                 {selected === '/auto/el' ? (
//                     <img src="/greek.jpeg" alt="Greek" className="imge z-30 w-3/4 md:w-2/5 cursor-pointer" onClick={openPdfInNewTab} />
//                 ) : (
//                     <img src="/english.jpeg" alt="English" className="imge z-30 w-3/4 md:w-2/5 cursor-pointer" onClick={openPdfInNewTab} />
//                 )}
//             </div>
//             <div className="google fixed md:right-16 right-0 top-10 z-50 overflow-hidden">
//                 <label htmlFor="langPicker" style={{ display: "none" }}>Lang: </label>
//                 <select
//                     id="langPicker"
//                     value={selected}
//                     onChange={langChange}
//                 style={{ width: 100, color: '#1C4456!important' }}
//                 className={'notranslate'}
//                 >
//                     <option value="" disabled>Select Language</option>
//                     {languages.map((lang) => (
//                         <option key={lang.value} value={lang.value}>
//                             {lang.label}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//         </>
//     );
// };

// export default Translate;
