import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

import Navbar from '@/components/layout/navbar';

function AppLayout() {
	return (
		<div>
			<Navbar />
			<div className="pt-90 pb-24 h-screen min-h-screen container mx-auto flex flex-col">
				<Outlet />
			</div>
			<Toaster />
		</div>
	);
}

export default AppLayout;
