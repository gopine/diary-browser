import { createRoot } from 'react-dom/client';
import './index.css';
import Routings from '@/Routings';
import { DiaryProvider } from '@/contexts/diary.context';
import { BrowserRouter } from 'react-router';

const root = document.getElementById('root');

if (root) {
	createRoot(root).render(
		<BrowserRouter basename="diary-browser">
			<DiaryProvider>
				<Routings />
			</DiaryProvider>
		</BrowserRouter>,
	);
}
