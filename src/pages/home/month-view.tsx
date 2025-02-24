import MonthSelect from '@/components/layout/month-select';
import { useDiary } from '@/contexts/diary.context';
import { GithubContent } from '@/types';
import { Link } from 'react-router';

function MonthView() {
	const { days } = useDiary();
	return (
		<div>
			<div className="w-full sm:hidden flex justify-center items-center gap-12 mb-16 px-8 xs:px-16">
				<MonthSelect />
			</div>
			<div className="w-full h-full flex justify-center px-16 pb-24">
				{days.length ? (
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-16">
						{days.map((day: GithubContent) => (
							<Link
								to={`/${day.path}`}
								key={day.path}
								className="py-16 px-8 flex justify-center items-center shadow-sm rounded-lg bg-white/5"
							>
								{day.name}
							</Link>
						))}
					</div>
				) : (
					<div>
						<div className="text-center text-lg text-primary">
							No days found.
						</div>
						<div>Please select a year and month.</div>
					</div>
				)}
			</div>
		</div>
	);
}

export default MonthView;
