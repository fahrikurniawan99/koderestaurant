import * as React from "react";
import { toast } from "react-hot-toast";
import { LuLoader2 } from "react-icons/lu";
import ApiAuth from "../../api/auth";
import Alert from "../Alert";
import Container from "../Container";
import KRInput from "../KRInput";

type RegisterProps = {
  onClickSecond: () => void;
};

export default function Register(props: RegisterProps) {
  const [errors, setErrors] = React.useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  return (
    <Container className="w-full max-w-xl">
      <h1 className="text-center text-2xl font-bold">Halaman Register</h1>
      <p className="text-center text-gray-500">
        Silahkan buat akun anda setelah itu lakukan login
      </p>
      {errors &&
        errors.map((error, index) => (
          <Alert key={index} type="Error" message={error} />
        ))}
      <form
        onSubmit={async (event: any) => {
          event.preventDefault();
          try {
            setErrors([]);
            setIsSubmitting(true);
            await ApiAuth.register(
              event.target.name.value,
              event.target.email.value,
              event.target.password.value
            );
            toast.success("Register berhasil");
            setTimeout(() => {
              props.onClickSecond();
            }, 1000);
          } catch (error: any) {
            toast.error("Register tidak berhasil");
            if (typeof error.response?.data?.message !== "string") {
              const errorMessages = Object.values(
                error.response?.data?.message
              ) as string[];
              setErrors(errorMessages);
            } else if (error.response?.data?.error?.code === 11000) {
              setErrors(["Email sudah terdaftar"]);
            } else {
              setErrors(["Internal server error"]);
            }
          } finally {
            setIsSubmitting(false);
          }
        }}
        className="mt-4 space-y-3"
      >
        <KRInput autoComplete="off" name="name" placeholder="Nama anda" />
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
            "Daftar Sekarang"
          )}
        </button>
      </form>
      <button
        onClick={props.onClickSecond}
        className="mx-auto my-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 active:scale-105"
      >
        Login Sekarang
      </button>
    </Container>
  );
}
