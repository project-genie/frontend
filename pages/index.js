import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Project Genie</title>
        <meta
          name="description"
          content="Build software application using the power of AI"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="grid grid-col-2 h-screen">
        <div className="col-start-1 col-end-2 flex justify-center items-center">
          <Image
            alt="People playing basketball"
            src="/ills/playing-basketball.svg"
            width={400}
            height={400}
          />
        </div>
        <div className="col-start-2 col-end-3 flex justify-center items-center">
          <div className="flex-col justify-center items-center">
            <h1 className="flex justify-center items-center font-thin text-6xl">
              Project{""}
              <span className="font-bold text-6xl text-primary-500">Genie</span>
            </h1>
            <div className="flex justify-center items-center mt-10">
              <Image
                alt="Project Genie Logo"
                src="/logo/logo_dark.svg"
                width={100}
                height={100}
              />
            </div>
            <div className="flex justify-center items-center mt-10">
              <p className="text-secondary-800 font-light">
                AI-Powered Software Development
              </p>
            </div>
            <div>
              <Link
                href="/account/signin"
                className="flex justify-center items-center mt-10 text-primary-600 animate-pulse"
              >
                Enter the platform
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
