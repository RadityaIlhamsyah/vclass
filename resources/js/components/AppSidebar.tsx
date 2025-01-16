import {
    BookOpenCheck,
    CirclePlus,
    CircleUserRound,
    Frame,
    LayoutDashboard,
    Map,
    NotepadText,
    PieChart,
    School,
} from 'lucide-react';
import * as React from 'react';

import { getMatkul } from '@/indexedDB';
import { useMatkul } from '@/stores/matkul-store';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
} from './ui/sidebar';

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const user = usePage().props.auth.user;
    const { matkul, setMatkul } = useMatkul();

    useEffect(() => {
        getMatkul()
            .then((storedMatkul) => {
                console.log('Stored Matkul:', storedMatkul);
                setMatkul(storedMatkul); // Set data yang diambil dari IndexedDB ke store
            })
            .catch((error) => console.error('Error getting matkul:', error));
    }, [setMatkul]);

    const data = {
        navMain: [
            {
                id: 0,
                title: 'Beranda',
                url: route('matkul.index'),
                icon: CircleUserRound,
                isActive: true,
                items: [
                    {
                        title: 'Dashboard',
                        role: 'all',
                        icon: LayoutDashboard,
                        url: route('matkul.index'),
                    },
                    {
                        title: 'Gabung Kelas',
                        icon: CirclePlus,
                        role: 'siswa',
                        url: route('matkul.search'),
                    },
                    {
                        title: 'Buat Kelas',
                        icon: CirclePlus,
                        role: 'guru',
                        url: route('buat-kelas'),
                    },
                ],
            },
            ...matkul.map((item) => ({
                id: item.id,
                title: `${item.kelas} - ${item.nama_matkul}`,
                url: route('pertemuan.index', { matkulId: item.id }),
                icon: School,
                items: [
                    {
                        title: 'Forum',
                        icon: School,
                        role: 'all',
                        url: route('forum.pertemuan', { matkulId: item.id }),
                    },
                    {
                        title: 'Tugas',
                        icon: BookOpenCheck,
                        role: 'all',
                        url: route('tugas.pertemuan', { matkulId: item.id }),
                    },
                    {
                        title: 'Nilai',
                        icon: NotepadText,
                        role: 'guru',
                        url: route('nilai.pertemuan', { matkulId: item.id }),
                    },
                ],
            })),
        ],
        projects: [
            {
                name: 'Design Engineering',
                url: '#',
                icon: Frame,
            },
            {
                name: 'Sales & Marketing',
                url: '#',
                icon: PieChart,
            },
            {
                name: 'Travel',
                url: '#',
                icon: Map,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <NavUser user={user} />
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter></SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
