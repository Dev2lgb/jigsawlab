export type Lang = 'ko' | 'en' | 'ja';
export const LANGS: Lang[] = ['ko', 'en', 'ja'];
export const prefix = (l: Lang) => (l === 'ko' ? '' : `/${l}`);
export const langOf = (pathname: string): Lang => (pathname.startsWith('/en') ? 'en' : pathname.startsWith('/ja') ? 'ja' : 'ko');
export const UI = {
  ko: { name: 'jigsawlab', tagline: '사진 한 장이 직소 퍼즐이 되는 곳', privacy: '개인정보처리방침', langName: '한국어', copied: '링크를 복사했어요', shareFail: '공유가 안 됐어요', madeBy: '캔통이 만들었어요', privacyTitle: '개인정보처리방침', toHome: '퍼즐로 돌아가기' },
  en: { name: 'jigsawlab', tagline: 'Where one photo becomes a jigsaw', privacy: 'Privacy', langName: 'English', copied: 'Link copied', shareFail: "Couldn't share", madeBy: 'Made by Cantong', privacyTitle: 'Privacy policy', toHome: 'Back to the puzzle' },
  ja: { name: 'jigsawlab', tagline: '写真一枚がジグソーパズルになる場所', privacy: 'プライバシー', langName: '日本語', copied: 'リンクをコピーしました', shareFail: '共有できませんでした', madeBy: 'Cantong が作りました', privacyTitle: 'プライバシーポリシー', toHome: 'パズルに戻る' },
} as const;
