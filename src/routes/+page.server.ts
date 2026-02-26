import type { PageServerLoad } from './$types';

interface GitHubStats {
	publicRepos: number;
	followers: number;
	following: number;
	avatarUrl: string;
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		const response = await fetch('https://api.github.com/users/azmimuwahid');

		if (!response.ok) {
			return { githubStats: null };
		}

		const data = await response.json();

		const githubStats: GitHubStats = {
			publicRepos: data.public_repos,
			followers: data.followers,
			following: data.following,
			avatarUrl: data.avatar_url
		};

		return { githubStats };
	} catch {
		return { githubStats: null };
	}
};
