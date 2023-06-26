import * as React from "react";
import Login from "../Login";
import Register from "../Register";

export default function Unauthorized() {
  const [type, setType] = React.useState<"login" | "register" | "none">("none");
  const setLogin = () => setType("login");
  const setRegister = () => setType("register");

  const Component = () => {
    if (type === "login") {
      return <Login onClickSecond={setRegister} />;
    }
    if (type === "register") {
      return <Register onClickSecond={setLogin} />;
    }
    return (
      <>
        <h1 className="text-center text-2xl font-bold">Akses di tutup</h1>
        <p className="text-center text-gray-500">
          Silahkan login untuk mendapatkan akses
        </p>
        <button
          onClick={setLogin}
          className="mx-auto mt-4 flex w-full max-w-[300px] items-center justify-center gap-1.5 rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white active:scale-105"
        >
          Menuju halaman login atau register
        </button>
      </>
    );
  };

  return (
    <div className="mb-10 flex h-auto min-h-[calc(100vh-62px)] flex-col items-center justify-center">
      <img
        alt="cloud-data-processing"
        src="cloud-data-processing.png"
        className="w-full max-w-[400px]"
      />
      <Component />
    </div>
  );
}
