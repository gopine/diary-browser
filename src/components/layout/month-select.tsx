import { useDiary } from '@/contexts/diary.context';
import ComboBox from '@/components/ui-kit/combo-box';
import Spinner from '@/components/ui-kit/spinner';

function MonthSelect() {
	const { years, months, year, month, setYear, setMonth, isLoading } =
		useDiary();

	return (
		<>
			<ComboBox
				options={years}
				value={year}
				onChange={setYear}
				placeholder="Select Year"
				disabled={isLoading}
			/>
			{year && (
				<ComboBox
					options={months}
					value={month}
					onChange={setMonth}
					placeholder="Select Month"
					disabled={isLoading}
				/>
			)}
			{isLoading && (
				<div className="w-40 h-40">
					<Spinner size={30} />
				</div>
			)}
		</>
	);
}

export default MonthSelect;
