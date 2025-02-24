import { GithubContent } from '@/types';
import {
	ReactNode,
	createContext,
	use,
	useCallback,
	useEffect,
	useState,
} from 'react';
import { toast } from 'react-hot-toast';
import { useLocation } from 'react-router';
import { routes } from '../consts';
import { listDays, listMonths, listYears } from '../services/github';

interface Props {
	children: ReactNode;
}

interface DiaryContextType {
	isLoading: boolean;
	years: GithubContent[];
	months: GithubContent[];
	days: GithubContent[];
	year: GithubContent | null;
	month: GithubContent | null;
	setYear: (year: GithubContent) => void;
	setMonth: (month: GithubContent) => void;
}

const DiaryContext = createContext<DiaryContextType>({
	isLoading: false,
	years: [],
	months: [],
	days: [],
	year: null,
	month: null,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setYear: (_: GithubContent) => {},
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	setMonth: (_: GithubContent) => {},
});

function DiaryProvider({ children }: Props) {
	const { pathname } = useLocation();
	const [isLoading, setIsLoading] = useState(false);

	const [years, setYears] = useState<GithubContent[]>([]);
	const [months, setMonths] = useState<GithubContent[]>([]);
	const [days, setDays] = useState<GithubContent[]>([]);

	const [year, setYear] = useState<GithubContent | null>(null);
	const [month, setMonth] = useState<GithubContent | null>(null);

	const fetchYears = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await listYears();
			setYears(res);
		} catch (e: unknown) {
			const { message } = e as Error;
			toast.error(message || 'Failed to fetch diary years');
		} finally {
			setIsLoading(false);
		}
	}, []);

	const fetchMonths = useCallback(async (year: GithubContent) => {
		try {
			setIsLoading(true);
			const res = await listMonths(year);
			setMonths(res);
		} catch (e: unknown) {
			const { message } = e as Error;
			toast.error(message || 'Failed to fetch diary months');
		} finally {
			setIsLoading(false);
		}
	}, []);

	const fetchDays = useCallback(async (month: GithubContent) => {
		try {
			setIsLoading(true);
			const res = await listDays(month);
			setDays(res);
		} catch (e: unknown) {
			const { message } = e as Error;
			toast.error(message || 'Failed to fetch diary days');
		} finally {
			setIsLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchYears();
	}, []);

	useEffect(() => {
		if (year) {
			setMonth(null);
			setMonths([]);
			fetchMonths(year);
		}
	}, [year, fetchMonths]);

	useEffect(() => {
		if (month) {
			fetchDays(month);
		}
	}, [month, fetchDays]);

	useEffect(() => {
		setDays([]);
	}, [month]);

	useEffect(() => {
		if (pathname === routes.home) {
			return;
		}
		if (days.length) {
			return;
		}
		const match = pathname.match(/(\d{4}\/\w+)\//);
		if (!match) {
			return;
		}
		fetchDays({
			encoding: '',
			html_url: '',
			name: '',
			url: '',
			path: match[1],
		});
	}, [pathname, days]);

	return (
		<DiaryContext
			value={{ years, months, days, year, month, setYear, setMonth, isLoading }}
		>
			{children}
		</DiaryContext>
	);
}

const useDiary = () => use(DiaryContext);

export { DiaryProvider, useDiary };
