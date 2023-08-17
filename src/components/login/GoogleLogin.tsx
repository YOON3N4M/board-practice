import { useSession, signIn, signOut } from "next-auth/react";

interface Props {
  loginOrRegister: string;
}

export default function GoogleLogin({ loginOrRegister }: Props) {
  const { data: session } = useSession();
  if (!session) {
    return (
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: `${window.location.origin}`,
          })
        }
      >
        구글 {loginOrRegister}
      </button>
    );
  }
}
