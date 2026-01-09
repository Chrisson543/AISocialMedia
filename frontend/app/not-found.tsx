import Link from "next/link";

export default function NotFound(){
    return (
        <div className="flex w-full h-full items-center justify-center flex-col space-x-3">
            <h1 className="text-3xl font-bold">Not Found</h1>
            <Link href={'/'} className="text-blue-500 underline">Back to Homepage</Link>
        </div>
    )
}