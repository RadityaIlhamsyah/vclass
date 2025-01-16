export default function HeaderOne({ children }: { children: string }) {
    return (
        <p className="text-5xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            {children}
        </p>
    );
}
