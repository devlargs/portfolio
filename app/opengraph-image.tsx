import { PROFILE } from '@constants/profile';
import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = `${PROFILE.name}, ${PROFILE.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/* mirrors app/tokens.css light mode - Satori cannot read CSS vars */
const PAPER = '#f1f4f7';
const INK = '#14161a';
const INK_2 = '#4d5054';
const ACCENT = '#732221';

const FRAUNCES_CSS = 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600&display=swap';

/* Satori cannot parse a variable font, so the CSS2 API is asked for a single
   static instance instead of pulling the variable TTF from the repo. An old
   User-Agent is what makes Google serve truetype rather than woff2. */
const LEGACY_UA = 'Mozilla/5.0 (Windows NT 10.0; rv:1.0) Gecko/20100101 Firefox/1.0';

/** Best-effort display face. Any failure returns null and the card renders in
 *  the bundled sans, so a network hiccup never breaks the build. */
const loadDisplayFont = async (): Promise<ArrayBuffer | null> => {
  try {
    const css = await fetch(FRAUNCES_CSS, { headers: { 'User-Agent': LEGACY_UA } }).then((r) => r.text());
    const url = /src:\s*url\((.+?)\)\s*format\('(?:truetype|opentype)'\)/.exec(css)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
};

const Image = async (): Promise<ImageResponse> => {
  const font = await loadDisplayFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `2px solid ${INK}`,
            paddingBottom: 20,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: INK_2,
          }}
        >
          <span>{PROFILE.role}</span>
          <span>{PROFILE.location}</span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontFamily: font ? 'Fraunces' : 'sans-serif',
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: -3,
            color: INK,
          }}
        >
          <span>I build web software</span>
          <span>
            that feels <span style={{ color: ACCENT }}>obvious</span>.
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${INK_2}`,
            paddingTop: 20,
            fontSize: 28,
            color: INK,
          }}
        >
          <span>{PROFILE.name}</span>
          <span style={{ color: ACCENT }}>ralphlargo.com</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: 'Fraunces', data: font, style: 'normal', weight: 400 }] : [],
    }
  );
};

export default Image;
