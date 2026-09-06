/** 장면 전환: .scene[data-scene] 중 하나만 .active. 플레이 장면에선 html[data-play] 로 헤더를 접는다 */
export function initScenes() {
  const scenes = Array.from(document.querySelectorAll<HTMLElement>('.scene'));
  let current = scenes.find((s) => s.classList.contains('active'))?.dataset.scene ?? '';
  const listeners: ((n: string) => void)[] = [];
  function go(name: string) {
    if (name === current) return;
    scenes.forEach((s) => s.classList.toggle('active', s.dataset.scene === name)); current = name;
    document.documentElement.dataset.play = name === 'play' ? 'on' : ''; window.scrollTo(0, 0);
    listeners.forEach((l) => l(name));
  }
  return { go, get current() { return current; }, onChange: (l: (n: string) => void) => listeners.push(l) };
}
