import React from "react";

export default function Values(props: any) {
  return (
    <div className="flex justify-between text-sm">
      <div className="flex space-x-2">
        <img className="w-5 h-5" src={props.img} />
        <p className="subpixel-antialiased font-medium">{props.texto}</p>
      </div>
      <p>{props.valor ? props.valor : "......"}</p>
    </div>
  );
}
