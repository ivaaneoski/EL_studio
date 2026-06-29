import React from 'react';

export default function Label({ children, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-mono text-xs uppercase tracking-widest text-black block mb-2 font-medium"
    >
      {children}
    </label>
  );
}
