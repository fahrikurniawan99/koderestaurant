import * as React from "react";
import { toast } from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import ApiAuth from "../../api/auth";
import Alert from "../Alert";
import Container from "../Container";
import KRInput from "../KRInput";

type LoginProps = {
  onClickSecond: () => void;
};

export default function Login(props: LoginProps) {
  const [error, setError] = React.useState<string>("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  return (
    <Container className="w-full max-w-xl">
      <h1 className="text-center text-2xl font-bold">Halaman Login</h1>
      <p className="text-center text-gray-500">
        Silahkan login dengan akun anda
      </p>
      {error && <Alert type="Error" message={error} />}
      <form
        onSubmit={async (event: any) => {
          event.preventDefault();
          try {
            setError("");
            setIsSubmitting(true);
            const response = await ApiAuth.login(
              event.target.email.value,
              event.target.password.value
            );
            localStorage.setItem("token", String(response.data.data.token));
            toast.success("Login berhasil");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (error: any) {
            toast.error("Login tidak berhasil");
            if (error.response?.data?.message) {
              setError(String(error.response.data?.message));
            } else {
              setError("Internal server error");
            }
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="mt-4 space-y-3"
      >
        <KRInput
          type="email"
          required
          autoComplete="off"
          name="email"
          placeholder="Alamat Email"
        />
        <KRInput
          required
          autoComplete="off"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="mx-auto mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white active:scale-105 disabled:opacity-80"
        >
          {isSubmitting ? (
            <>
              Loading
              <LuLoader2 className="block animate-spin stroke-[2px]" />
            </>
          ) : (
            "Login Sekarang"
          )}
        </button>
      </form>
      <button
        onClick={props.onClickSecond}
        className="mx-auto my-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 active:scale-105"
      >
        Buat Akun Sekarang
      </button>
    </Container>
  );
}
