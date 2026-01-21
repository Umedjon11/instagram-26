import InstagramTextLogo from "@/components/instagramTextLogo"
import RegisterForm from "@/components/registerForm"
import Image from "next/image"

const Register = () => {
  return (
    <main className="flex justify-between w-[80%] sm:w-[70%] m-[0_auto] h-screen items-center">
      <Image
        src="/loginImage.png"
        alt="Image"
        width={600}
        height={500}
        className="hidden sm:block"
      />
      <aside className="w-full sm:w-[35%] flex flex-col items-center gap-[3vh]">
        <InstagramTextLogo width="153" height="50" />
        <RegisterForm />
      </aside>
    </main>
  )
}

export default Register