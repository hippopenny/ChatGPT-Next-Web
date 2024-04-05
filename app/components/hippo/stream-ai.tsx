import { useEffect, useState } from "react";
import { getPathVidStream } from "../../api/hippo/hippofunc";

/**
 * stream vid botchat
 *
 */
export function Stream() {
  const [selectPathStream, setSelectPathStream] = useState("");

  // set path vid to stream
  const setStreambot = (data) => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setSelectPathStream(data[randomIndex]);
  };

  //
  const handleChanglePathVid = () => {
    const pathVidOnClient = localStorage.getItem("pathVidStream");
    if (pathVidOnClient && pathVidOnClient !== selectPathStream) {
      setSelectPathStream(pathVidOnClient);
    }
  };

  // call path vid from server
  const getData = async () => {
    const result = await getPathVidStream();
    setStreambot(result);
  };

  useEffect(() => {
    localStorage.setItem("pathVidStream", "");
    getData();
  }, []);

  return (
    <>
      {selectPathStream ? ( // reload ui when call selectPathStream
        <div className="cam-stream">
          <video
            key={selectPathStream}
            autoPlay
            muted
            loop
            onTimeUpdate={handleChanglePathVid}
          >
            <source src={selectPathStream} type="video/mp4" />
          </video>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
