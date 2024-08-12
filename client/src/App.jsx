import React, { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [bimSurferLoaded, setBimSurferLoaded] = useState(false);
  const viewerRef = useRef(null);

  console.log(window.BimSurfer)
  useEffect(() => {
    const initializeBimSurfer = () => {
      if (window.BimSurfer && viewerRef.current) {
        const bimSurfer = new window.BimSurfer({
          domNode: "viewerContainer",
        });

        bimSurfer
          .load({
            src: "/models/Duplex",
            // src: "/models/SampleGLB",
            // type: "gltf",
          })
          .then(() => {
            console.log("Model loaded successfully.");
          })
          .catch((error) => {
            console.error("Error loading model:", error);
          });

        return () => {
          bimSurfer.destroy();
        };
      } else {
        console.error(
          "BimSurfer is not available or not initialized correctly."
        );
      }
    };

    const pollForBimSurfer = () => {
      if (window.BimSurfer && typeof window.BimSurfer === "function") {
        setBimSurferLoaded(true);
      } else {
        setTimeout(pollForBimSurfer, 100);
      }
    };

    pollForBimSurfer();

    if (bimSurferLoaded) {
      initializeBimSurfer();
    }
  }, [bimSurferLoaded]);

  return (
    <div
      id="viewerContainer"
      ref={viewerRef}
      style={{ width: "100%", height: "100vh" }}
    ></div>
  );
}

export default App;
