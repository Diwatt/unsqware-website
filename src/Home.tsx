import React from 'react';

export function Home() {
  return (
    <>
      <h2 className="title">
            Watch Keep Running
      </h2>

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

     
    </>
  )
}