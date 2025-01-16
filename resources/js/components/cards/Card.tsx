export default function Card({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className="bg-white p-5 shadow dark:bg-gray-800 sm:rounded-lg">
            <section className={className}>{children}</section>
        </div>
    );
}
