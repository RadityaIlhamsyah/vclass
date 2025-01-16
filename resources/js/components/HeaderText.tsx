export default function HeaderText({ text }: { text: string }) {
    return (
        <div className="max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                {text}
            </h2>
        </div>
    );
}
