import { AppSidebar } from '@/components/AppSidebar';
import HeaderText from '@/components/HeaderText';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

interface Props {
    title: string;
    children: React.ReactNode;
}

export default function SidebarLayout({ title, children }: Props) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset className="relative">
                <header className="fixed flex h-16 w-full shrink-0 items-center gap-2 border-b bg-white px-4">
                    <SidebarTrigger className="-ml-1" />
                    <HeaderText text={title}></HeaderText>
                    <Separator orientation="vertical" className="mr-2 h-4" />
                </header>
                <div className="mt-16 flex flex-1 flex-col gap-4 p-4">
                    <div className="h-full rounded-lg bg-gray-100 dark:bg-gray-900">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
