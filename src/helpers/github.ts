import { GithubContent } from '@/types';

export function mapGitHubContent(raw: any): GithubContent {
	const name = raw.name.endsWith('.md')
		? raw.name.substring(0, raw.name.length - 3)
		: raw.name;
	return {
		name,
		url: raw.url,
		path: raw.path,
		html_url: raw.html_url,
		sha: raw.sha,
		content: raw.content,
		encoding: raw.encoding,
	};
}
