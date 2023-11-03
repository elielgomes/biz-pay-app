import './globals.css'
import type { Metadata } from 'next'
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import { Roboto } from "next/font/google";
import { Navbar } from '@/components/Navbar';
import { usePathname } from 'next/navigation';

const roboto = Roboto({
	weight: ["100", '300', '400', '500', '700', '900'],
	subsets: ['latin'],
	style: 'normal',
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-br">
			<body className={`${roboto.className} bg-slate-50`}>
				<AuthProvider>
					{children}
					<Toaster />
				</AuthProvider>
			</body>
		</html>
	)
}
