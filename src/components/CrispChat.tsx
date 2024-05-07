import { useEffect } from 'react';

const CrispChat: React.FC = () => {
  useEffect(() => {
    // Define window.$crisp and window.CRISP_WEBSITE_ID
    (window as any).$crisp = [];
    (window as any).CRISP_WEBSITE_ID = "15f9c6a4-b3c0-4034-9646-d2418190be80";

    // Create a new script element for Crisp chat
    const crispScript = document.createElement("script");
    crispScript.src = "https://client.crisp.chat/l.js";
    crispScript.async = true;

    // Append the script to the document head
    document.head.appendChild(crispScript);

    // Clean up function to remove the script when component unmounts
    return () => {
      document.head.removeChild(crispScript);
      delete (window as any).$crisp;
      delete (window as any).CRISP_WEBSITE_ID;
    };
  }, []);

  // Return null because this component doesn't render anything
  return null;
};

export default CrispChat;
