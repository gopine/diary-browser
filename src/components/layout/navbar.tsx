import MonthSelect from '@/components/layout/month-select';
import { routes } from '@/consts';
import {
	Button,
	Dialog,
	DialogBackdrop,
	DialogPanel,
	Transition,
} from '@headlessui/react';
import {
	ArrowUturnLeftIcon,
	Bars4Icon,
	XMarkIcon,
} from '@heroicons/react/24/solid';
import { Fragment, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

const showHamburger = false;

function Navbar() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const handleBack = () => {
		navigate(routes.home);
	};

	const [sidebar, setSidebar] = useState(false);

	const isHome = pathname === routes.home;

	return (
		<nav className="fixed w-screen h-64 flex items-center border-b border-black/5 backdrop-blur-xs">
			<div className="container mx-auto flex justify-between items-center px-16 sm:px-0">
				<div className="flex gap-16 items-center">
					<Link to={routes.home}>
						<div className="font-medium text-lg">Diary Browser</div>
					</Link>
					{isHome && (
						<div className="hidden sm:flex items-center gap-12">
							<MonthSelect />
						</div>
					)}
				</div>
				<div className="flex items-center gap-16">
					{!isHome && (
						<Button className="icon-button" onClick={handleBack}>
							<ArrowUturnLeftIcon width={24} />
						</Button>
					)}
					{showHamburger && (
						<Button
							className="icon-button sm:hidden"
							onClick={() => setSidebar(true)}
						>
							<Bars4Icon width={24} />
						</Button>
					)}
				</div>
			</div>

			<Transition show={sidebar} as={Fragment}>
				<Dialog onClose={() => setSidebar(false)}>
					<DialogBackdrop className="fixed inset backdrop-blur-xs" />
					<div className="fixed inset-0 w-screen">
						<div className="relative w-full h-full">
							<DialogPanel className="absolute w-300 h-screen right-0 space-y-4 bg-white shadow">
								<div className="flex justify-end px-16 pt-16">
									<Button
										className="icon-button"
										onClick={() => setSidebar(false)}
									>
										<XMarkIcon width={24} />
									</Button>
								</div>
								<div className="relative w-full h-full p-16">
									<div className="flex flex-col gap-16">
										<div className="text-lg font-semibold">
											Select Year and Month
										</div>
										<div className="relative flex flex-col gap-16 mt-16">
											<MonthSelect />
										</div>
									</div>
								</div>
							</DialogPanel>
						</div>
					</div>
				</Dialog>
			</Transition>
		</nav>
	);
}

export default Navbar;
