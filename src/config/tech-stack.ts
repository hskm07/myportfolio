export const stackAsOf = { iso: '2026-07-24', label: '2026年7月時点' };
export const stackUpdatedAt = { iso: '2026-11-11', label: '2026年11月' };

export const stackCategories = [
  { id: 'languages', label: '言語', en: 'LANGUAGES' },
  { id: 'ai', label: 'AI・LLM', en: 'AI & AGENTS' },
  { id: 'frameworks', label: 'Web・UI', en: 'WEB & UI' },
  { id: 'infrastructure', label: '基盤・クラウド', en: 'INFRA & CLOUD' },
  { id: 'databases', label: 'データベース', en: 'DATABASES' },
  { id: 'automation', label: '自動化・連携', en: 'AUTOMATION & INTEGRATION' },
  { id: 'management', label: 'マネジメント', en: 'TEAM LEADERSHIP' },
] as const;

type CategoryId = (typeof stackCategories)[number]['id'];
export interface TechEntry {
  id: string;
  name: string;
  category: CategoryId;
  months: number | null;
  description: string;
  logo?: string;
  logos?: string[];
  monogram?: string;
}

// Experience periods are taken from the supplied skills table as of 2026-07-24.
// Team leadership and GitLab CI/CD: 36 months each, supplied on 2026-11-11.
// Null means that usage is documented but a duration was not supplied.
export const techStack: TechEntry[] = [
  { id: 'python', name: 'Python', category: 'languages', months: 108, logo: 'python', description: 'ライブラリ・API・データ処理' },
  { id: 'go', name: 'Go', category: 'languages', months: 60, logo: 'go', description: 'バックエンド・パッケージ開発' },
  { id: 'rust', name: 'Rust', category: 'languages', months: 36, logo: 'rust', description: 'パッケージ・アプリケーション開発' },
  { id: 'typescript', name: 'TypeScript', category: 'languages', months: 36, logo: 'typescript', description: 'Webアプリケーション開発' },
  { id: 'javascript', name: 'JavaScript', category: 'languages', months: 36, logo: 'javascript', description: 'Webアプリケーション開発' },
  { id: 'c-cpp', name: 'C / C++', category: 'languages', months: 48, logos: ['c', 'cplusplus'], description: '組み込み機器・ドライバ開発' },
  { id: 'shell', name: 'Shell Script', category: 'languages', months: 66, logo: 'bash', description: '定型処理・作業の自動化' },
  { id: 'vba', name: 'VBA', category: 'languages', months: 18, monogram: 'VBA', description: 'Office関連の処理' },
  { id: 'iec', name: 'IEC 61131-3', category: 'languages', months: 12, monogram: 'IEC', description: '制御プログラミング' },
  { id: 'vllm', name: 'vLLM', category: 'ai', months: 24, logo: 'vllm', description: 'モデルサービング・パラメータ調整' },
  { id: 'ollama', name: 'Ollama', category: 'ai', months: 24, logo: 'ollama', description: 'ローカルLLMの実行・利用環境' },
  { id: 'llamacpp', name: 'llama.cpp', category: 'ai', months: 24, monogram: 'LLM', description: 'ローカルLLMの実行・検証' },
  { id: 'copilot', name: 'GitHub Copilot', category: 'ai', months: 18, logo: 'copilot', description: 'コード作成支援・プロンプト設計' },
  { id: 'devin', name: 'Devin', category: 'ai', months: 18, logo: 'devin', description: '開発タスクでのエージェント活用' },
  { id: 'codex', name: 'OpenAI Codex', category: 'ai', months: 12, logo: 'codex', description: '開発タスクでのエージェント活用' },
  { id: 'claude', name: 'Claude Code', category: 'ai', months: 12, logo: 'claude', description: '開発タスクでのエージェント活用' },
  { id: 'flask', name: 'Flask', category: 'frameworks', months: 36, logo: 'flask', description: 'PythonによるWeb開発' },
  { id: 'django', name: 'Django', category: 'frameworks', months: 24, logo: 'django', description: 'PythonによるWeb開発' },
  { id: 'react', name: 'React', category: 'frameworks', months: 36, logo: 'react', description: 'Webフロントエンド開発' },
  { id: 'streamlit', name: 'Streamlit', category: 'frameworks', months: 24, logo: 'streamlit', description: 'データ活用アプリケーション' },
  { id: 'nextjs', name: 'Next.js', category: 'frameworks', months: 18, logo: 'nextjs', description: 'Webアプリケーション開発' },
  { id: 'qt', name: 'Qt', category: 'frameworks', months: 12, logo: 'qt', description: 'GUIアプリケーション開発' },
  { id: 'fastapi', name: 'FastAPI', category: 'frameworks', months: null, logo: 'fastapi', description: 'API・LLMアプリケーション開発' },
  { id: 'docker', name: 'Docker', category: 'infrastructure', months: 48, logo: 'docker', description: 'コンテナによる開発・実行環境' },
  { id: 'googlecloud', name: 'Google Cloud', category: 'infrastructure', months: 36, logo: 'googlecloud', description: 'サービス連携・環境構築' },
  { id: 'ubuntu', name: 'Ubuntu', category: 'infrastructure', months: 60, logo: 'ubuntu', description: 'Linux環境の構築・開発' },
  { id: 'debian', name: 'Debian', category: 'infrastructure', months: 24, logo: 'debian', description: 'Linux環境の構築・開発' },
  { id: 'centos', name: 'CentOS', category: 'infrastructure', months: 36, logo: 'centos', description: 'Linux環境の構築・開発' },
  { id: 'kubernetes', name: 'Kubernetes', category: 'infrastructure', months: 6, logo: 'kubernetes', description: '基礎的な知識・利用経験' },
  { id: 'mysql', name: 'MySQL', category: 'databases', months: 24, logo: 'mysql', description: 'データベースを使った開発' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'databases', months: 24, logo: 'postgresql', description: 'データベースを使った開発' },
  { id: 'uipath', name: 'UiPath', category: 'automation', months: null, logo: 'uipath', description: '業務自動化・RPA開発' },
  { id: 'github-actions', name: 'GitHub Actions', category: 'automation', months: null, logo: 'githubactions', description: '自動テスト・ビルドの整備' },
  { id: 'gitlab-cicd', name: 'GitLab CI/CD', category: 'automation', months: 36, logo: 'gitlab', description: 'CI/CDによる開発工程の自動化' },
  { id: 'modbus', name: 'Modbus TCP/IP', category: 'automation', months: 8, monogram: 'TCP', description: '産業用機器との通信処理' },
  { id: 'team-leadership', name: 'チームリード', category: 'management', months: 36, monogram: 'TL', description: '開発チームのリード・進捗共有' },
];

export function experienceLabel(months: number | null) {
  if (months === null) return '実務で使用（年数未記載）';
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  return `${years ? `${years}年` : ''}${remaining ? `${remaining}か月` : ''}`;
}
