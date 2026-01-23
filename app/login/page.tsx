import InstagramTextLogo from "@/components/instagramTextLogo"
import LoginForm from "@/components/loginForm"
import Image from "next/image"

const Login = () => {
  return (
    <main className="flex justify-between w-[80%] sm:w-[70%] m-[0_auto] h-screen items-center">
      <Image
        draggable={false}
        src="/loginImage.png"
        alt="Image"
        width={600}
        height={500}
        className="hidden sm:block"
      />
      <aside className="w-full sm:w-[35%] flex flex-col items-center gap-[3vh]">
        <InstagramTextLogo width="153" height="50" />
        <LoginForm />
      </aside>
    </main>
  )
}

export default Login