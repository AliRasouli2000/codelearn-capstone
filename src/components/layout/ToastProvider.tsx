"use client";

import { Bounce, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";

export default function ToastProvider() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick={false}
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
    />
  );
}