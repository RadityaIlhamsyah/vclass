import HeaderOne from '../headers/HeaderOne';

export default function CardHeader({ children }: { children: string }) {
    return (
        <div className="h-36 w-full rounded-lg bg-gray-400 bg-matkul-bg-pattern bg-cover">
            <div className="mx-5 grid h-full w-full items-center">
                <HeaderOne>{children}</HeaderOne>
            </div>
        </div>
    );
}
