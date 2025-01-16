export default function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="flex h-full w-full gap-5 rounded-lg bg-red-500 p-5">
            <p className="text-3xl text-white">{message}</p>
        </div>
    );
}
