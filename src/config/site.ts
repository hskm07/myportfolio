export const site = {
  displayName: 'Orbitto',
  title: 'Orbitto | システム開発・技術コンサルティング',
  description: 'Orbittoのシステム開発・技術コンサルティング。開発チームのリード、ローカルLLM基盤構築、AIエージェント開発の担当実績を匿名で紹介。要件整理から設計・開発・検証まで支援します。',
  inquiryStatus: 'limited' as 'open' | 'limited' | 'paused',
  inquiryMessage: 'スポットのご相談を個別に調整しています',
  contactFormUrl: 'https://forms.gle/6ehS6n6sypzE6wLp7',
  crowdworksUrl: 'https://crowdworks.jp/public/employees/2205975?ref=login_header',
};

export function pathTo(path = '') {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
