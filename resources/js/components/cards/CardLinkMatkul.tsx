import Card from './Card';

export default function CardLinkMatkul({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Card>
            <div className="grid space-y-5">{children}</div>
        </Card>
    );
}
