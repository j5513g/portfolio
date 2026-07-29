export const tagColors: Record<string, string> = {
  crochet: '#c9838d',
  travel: '#8fa08a',
  robotics: '#6b8fad',
  competitions: '#9e3b30',
  volunteering: '#cba36a',
  nonprofit: '#8f7aa8',
  life: '#a89888',
  birthdays: '#c9838d',
}

export function tagColor(tag: string) {
  return tagColors[tag] ?? '#5b7fa3'
}
