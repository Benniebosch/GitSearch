
export class GitSearchResultItem
{
    constructor(
        public id: number,
        public full_name: string,
        public html_url: string,
        public description: string,
        public forks: number,
        public open_issues: number,
        public watchers: number
        ){}
}

export interface IGitSearchResult
{
    total_count: number;
    incomplete_results: boolean;
    items: GitSearchResultItem[];
}

