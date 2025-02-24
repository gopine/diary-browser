import AppLayout from '@/components/layout/app-layout';
import { routes } from '@/consts';
import DayDetails from '@/pages/day';
import Home from '@/pages/home';
import { Route, Routes } from 'react-router';

function Routings() {
	return (
		<Routes>
			<Route path={routes.home} element={<AppLayout />}>
				<Route index element={<Home />} />
				<Route path="/:year/:month/:name" element={<DayDetails />} />
			</Route>
		</Routes>
	);
}

export default Routings;
