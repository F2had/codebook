import { FC, useRef, useEffect } from "react";

import "./Preview.css";
interface PreviewProps {
  code: string;
  err: string;
}

const html = `
<html>
  <head>
  <style>
  html, body {
    background-color: #fff;
  }
  </style>
  </head>
  <body>
  <div id="root"></div>
  <script>
  const handleError = (error) => {
    console.error(error);
    const root = document.getElementById('root');
    root.innerHTML = '<div style="color: red;"><h4>Runtime Error: </h4> <br>'+  error + '</div>';
  }

  window.addEventListener('error', (event) => {
    event.preventDefault();
    handleError(event.error);
  });
  window.addEventListener("message", (event) => {
    const { data } = event;
    try {
      eval(data);
    } catch (e) {
      handleError(e);
      throw e;
     
    }
  }, false)
  </script>
  </body>
</html>
`;

const Preview: FC<PreviewProps> = ({ code, err }) => {
  const iframe = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    //reset the iframe content
    iframe.current!.srcdoc = html;
    // wait for the iframe to load
    setTimeout(() => {
      iframe.current!.contentWindow!.postMessage(code, "*");
    }, 100);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        ref={iframe}
        srcDoc={html}
        sandbox="allow-scripts"
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
