import { mapGitHubContent } from '@/helpers/github';
import { GithubContent } from '@/types';

const ghUser = 'gopine';
const diaryRepoName = 'diary';

const baseUrl = `https://api.github.com/repos/${ghUser}/${diaryRepoName}`;

const monthOrder = [
	'jan',
	'feb',
	'mar',
	'apr',
	'may',
	'jun',
	'jul',
	'aug',
	'sep',
	'oct',
	'nov',
	'dec',
];

function getDayFromName(name: string): number {
	const match = name.match(/\w+ (\d+)/);
	if (match) {
		return +match[1];
	}
	return 0;
}

export async function listYears(): Promise<GithubContent[]> {
	const rawContent = await fetch(`${baseUrl}/contents`).then((res) =>
		res.json(),
	);
	if (rawContent.message) {
		throw new Error(rawContent.message);
	}
	return rawContent.map(mapGitHubContent);
}

export async function listMonths(
	year: GithubContent,
): Promise<GithubContent[]> {
	const rawContent = await fetch(`${baseUrl}/contents/${year.path}`).then(
		(res) => res.json(),
	);
	if (rawContent.message) {
		throw new Error(rawContent.message);
	}
	return rawContent
		.map(mapGitHubContent)
		.sort((a: GithubContent, b: GithubContent) => {
			return (
				monthOrder.indexOf(a.name.toLowerCase().slice(0, 3)) -
				monthOrder.indexOf(b.name.toLowerCase().slice(0, 3))
			);
		});
}

export async function listDays(month: GithubContent): Promise<GithubContent[]> {
	const rawContent = await fetch(`${baseUrl}/contents/${month.path}`).then(
		(res) => res.json(),
	);
	if (rawContent.message) {
		throw new Error(rawContent.message);
	}
	return rawContent
		.map(mapGitHubContent)
		.sort(
			(a: GithubContent, b: GithubContent) =>
				getDayFromName(a.name) - getDayFromName(b.name),
		);
}

export async function getDayDetails(pathname: string): Promise<GithubContent> {
	const rawContent = await fetch(
		`${baseUrl}/contents${pathname}?ref=master`,
	).then((res) => res.json());
	if (rawContent.message) {
		throw new Error(rawContent.message);
	}
	return mapGitHubContent(rawContent);
}
