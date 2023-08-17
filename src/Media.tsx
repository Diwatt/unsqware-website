import React from 'react';

export function Media() {
  return (
    <>
        <h1 className="title">
            Keep Running
        </h1>
        <iframe width="560" height="315"
          src="https://www.youtube.com/embed/LILiicvfQ08"
          style={{
            width: "100%",
            height: "60vh",
            margin: "20px auto 0",
            border: "none",
            borderRadius: "10px"
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>

        <h1 className="title">
            Personne
        </h1>

        <iframe width="560" height="315"
          src="https://www.youtube.com/embed/IdZXIpnT_S8"
          style={{
            width: "100%",
            height: "60vh",
            margin: "20px auto 0",
            border: "none",
            borderRadius: "10px"
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
        </iframe>  
    </>
  )
}