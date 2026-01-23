import InstagramTextLogo from "@/components/instagramTextLogo"
const NotFound = () => {

    return (
        <main className="ml-auto w-[82%] flex flex-col gap-[3vh] h-screen justify-center items-center">
            <InstagramTextLogo width="250" height="100" />
            <h1 className="text-xl font-semibold">Sorry this page is not defined!!</h1>
            <button className="p-[1vh_20px] rounded-md border">Go back</button>
        </main>
    )
}

export default NotFound