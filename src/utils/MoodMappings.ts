export type Mood = 'angry' | 'disgusted' | 'fearful' | 'happy' | 'neutral' | 'sad' | 'surprised';

export type MusicArtist =
  | 'Adele'
  | 'Angelo Badalamenti'
  | 'Animal Collective'
  | 'Aphex Twin'
  | 'Basement Jaxx'
  | 'Black Sabbath'
  | 'Boards of Canada'
  | 'Brian Eno'
  | 'Burial'
  | 'Chemical Brothers'
  | 'Daft Punk'
  | 'Darude'
  | 'Dua Lipa'
  | 'Electronic'
  | 'Faithless'
  | 'Fatboy Slim'
  | 'Harry Styles'
  | 'Harold Budd'
  | 'Iron Maiden'
  | 'Jean-Michel Jarre'
  | 'John Carpenter'
  | 'John Legend'
  | 'Justice'
  | 'Klaus Schulze'
  | 'Lana Del Rey'
  | 'LCD Soundsystem'
  | 'Lewis Capaldi'
  | 'M83'
  | 'Mark Snow'
  | 'Massive Attack'
  | 'Megadeth'
  | 'Metallica'
  | 'Mike Oldfield'
  | 'Motörhead'
  | 'Opeth'
  | 'Pantera'
  | 'Pendulum'
  | 'Pink Floyd'
  | 'Punk'
  | 'Radiohead'
  | 'Scooter'
  | 'Slayer'
  | 'Soundtracks'
  | 'The Crystal Method'
  | 'The Prodigy'
  | 'The Weeknd'
  | 'Tangerine Dream'
  | 'Tim Hecker'
  | 'Tool'
  | 'Underworld'
  | 'Vangelis';

export type MusicCategory =
  | 'acoustic'
  | 'alternative'
  | 'ambient'
  | 'avant-garde'
  | 'ballad'
  | 'chillout'
  | 'classical'
  | 'dance'
  | 'death metal'
  | 'electronic'
  | 'energetic'
  | 'experimental'
  | 'grunge'
  | 'heavy metal'
  | 'hip hop'
  | 'indie'
  | 'instrumental'
  | 'metal'
  | 'opera'
  | 'pop'
  | 'punk'
  | 'rock'
  | 'soundtracks'
  | 'suspenseful';

export const moodToMusicGenre: Record<Mood, MusicCategory[]> = {
  angry: ['rock', 'metal', 'punk'],
  disgusted: ['heavy metal', 'grunge', 'death metal', 'experimental'],
  fearful: ['classical', 'soundtracks', 'opera', 'suspenseful'],
  happy: ['pop', 'dance', 'hip hop'],
  neutral: ['ambient', 'instrumental', 'chillout'],
  sad: ['indie', 'alternative', 'acoustic', 'ballad'],
  surprised: ['electronic', 'experimental', 'avant-garde', 'energetic']
};

export const musicCategoryArtists: Record<MusicCategory, MusicArtist[]> = {
  acoustic: ['Lewis Capaldi', 'John Legend', 'Adele', 'Lana Del Rey'],
  alternative: ['Radiohead', 'Pink Floyd'],
  ambient: ['Brian Eno', 'Harold Budd', 'Tim Hecker'],
  'avant-garde': ['Mike Oldfield', 'Tangerine Dream', 'Vangelis', 'Klaus Schulze', 'Jean-Michel Jarre'],
  ballad: ['Lewis Capaldi', 'John Legend', 'Adele'],
  chillout: ['Brian Eno', 'Harold Budd', 'Tim Hecker'],
  classical: ['Mike Oldfield', 'Tangerine Dream', 'Vangelis', 'Klaus Schulze', 'Jean-Michel Jarre'],
  dance: ['Dua Lipa', 'Harry Styles', 'Justice', 'M83'],
  'death metal': ['Opeth'],
  electronic: [
    'Daft Punk',
    'Justice',
    'M83',
    'Chemical Brothers',
    'Fatboy Slim',
    'Scooter',
    'Underworld',
    'Basement Jaxx',
    'The Crystal Method',
    'Pendulum'
  ],
  energetic: [
    'Daft Punk',
    'LCD Soundsystem',
    'Radiohead',
    'Massive Attack',
    'The Prodigy',
    'Chemical Brothers',
    'Darude',
    'Fatboy Slim',
    'Scooter',
    'Faithless',
    'Underworld',
    'Basement Jaxx',
    'The Crystal Method',
    'Pendulum'
  ],
  experimental: ['Mike Oldfield', 'Tangerine Dream', 'Vangelis', 'Klaus Schulze', 'Jean-Michel Jarre'],
  'heavy metal': [
    'Black Sabbath',
    'Iron Maiden',
    'Slayer',
    'Metallica',
    'Motörhead',
    'Tool',
    'Pantera',
    'Megadeth',
    'Opeth'
  ],
  'hip hop': ['The Weeknd'],
  grunge: ['Radiohead'],
  indie: ['Radiohead'],
  instrumental: ['Brian Eno', 'Harold Budd', 'Tim Hecker'],
  metal: ['Black Sabbath', 'Iron Maiden', 'Slayer', 'Metallica', 'Motörhead', 'Tool', 'Pantera', 'Megadeth', 'Opeth'],
  opera: ['Mike Oldfield', 'Tangerine Dream', 'Vangelis', 'Klaus Schulze', 'Jean-Michel Jarre'],
  pop: ['The Weeknd', 'Dua Lipa', 'Harry Styles'],
  punk: ['The Prodigy'],
  rock: [
    'Black Sabbath',
    'Iron Maiden',
    'Slayer',
    'Metallica',
    'Motörhead',
    'Tool',
    'Pantera',
    'Megadeth',
    'Opeth',
    'Pink Floyd',
    'Radiohead'
  ],
  soundtracks: ['John Carpenter', 'Mark Snow', 'Angelo Badalamenti'],
  suspenseful: ['John Carpenter', 'Mark Snow', 'Angelo Badalamenti']
};

const getRandomMusicCategory = (mood: Mood): MusicCategory => {
  const categories = moodToMusicGenre[mood];
  return categories[Math.floor(Math.random() * categories.length)];
};

const searchSongsQuery = (mood: Mood): string => {
  const musicCategory = getRandomMusicCategory(mood);
  const randomArtist =
    musicCategoryArtists[musicCategory][Math.floor(Math.random() * musicCategoryArtists[musicCategory].length)];
  return `${musicCategory} music by ${randomArtist}`;
};

export { searchSongsQuery };
