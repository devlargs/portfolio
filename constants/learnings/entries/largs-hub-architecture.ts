import { Learning } from '../types';

const learning: Learning = {
  slug: 'largs-hub-architecture',
  title: 'Building a Rambox alternative in Electron',
  summary:
    'Why I built one on WebContentsView instead of webview, and the three bugs that taught me the most: orphaned session partitions, a domain check missing a dot, and hibernation that killed running work.',
  tags: ['electron', 'react', 'typescript', 'architecture'],
  body: [
    {
      kind: 'text',
      content:
        'I use about eight web apps all day: Gmail, Slack, Discord, Messenger, WhatsApp, Notion, LinkedIn. In a browser they become eight tabs that get buried under forty other tabs, and I lose them. Every single day.',
    },
    {
      kind: 'text',
      content:
        'Rambox solves this. The free tier is limited though, and the app phones home, so I built [Largs Hub](https://github.com/devlargs/largs-hub): an open-source workspace browser that keeps every web app in one window, each in its own isolated session, with no account and no telemetry. Everything lives in a local `electron-store` file.',
    },
    {
      kind: 'text',
      content:
        'Electron 35, React 19, TypeScript, Vite, Zustand, Tailwind 4. Below are the decisions that actually shaped the codebase, and the bugs that forced most of them.',
    },
    {
      kind: 'heading',
      content: 'The decision everything else follows from',
    },
    {
      kind: 'text',
      content:
        'Electron gives you three ways to embed a third-party page. `<iframe>` is out immediately. Every app worth embedding sends `X-Frame-Options`. That leaves the `<webview>` tag and `WebContentsView`.',
    },
    {
      kind: 'text',
      content:
        "`<webview>` is the tempting one because it looks like React. You render a component, you get a page. But it's been officially discouraged for years, it drags in a heavier process model, and the moment you need a service to keep running while it's off screen, you're fighting the DOM to keep an element mounted that the user can't see.",
    },
    {
      kind: 'text',
      content:
        'I went with `WebContentsView`. The consequence is bigger than it sounds: **the main process owns the layout.** Service pages are native views that main positions by pixel bounds. They are not in the React tree at all.',
    },
    {
      kind: 'text',
      content:
        'Which means the React UI is itself a `WebContentsView`, sitting in the same window as the service views, and z-order becomes something you manage explicitly over IPC:',
    },
    {
      kind: 'code',
      label: 'preload.ts',
      content: `bringUiToFront: (): void => ipcRenderer.send("bring-ui-to-front"),
sendUiToBack: (): void => ipcRenderer.send("send-ui-to-back"),`,
    },
    {
      kind: 'text',
      content:
        "When a modal opens, the UI comes forward and the service view goes behind it. When it closes, the UI drops back. There is no CSS `z-index` that can do this, because the service page isn't a DOM node.",
    },
    {
      kind: 'text',
      content:
        '`main.ts` ended up owning the window, the UI view, the link preview overlay and z-order IPC. Everything else is delegated:',
    },
    {
      kind: 'code',
      label: 'src/main',
      content: `store.ts              persistent state + stored-shape validation
serviceViews.ts       service view lifecycle, switching, hibernation
downloads.ts          per-session download handling + completion toast
notificationCounts.ts badge state, debounce, taskbar overlay
badge-adapters/       per-service unread-count extraction
ipc/services.ts       service CRUD/toggles/navigation/context menu
ipc/security.ts       workspace lock: master password + auto-lock timer`,
    },
    {
      kind: 'heading',
      content: 'One session partition per service',
    },
    {
      kind: 'text',
      content:
        'This is the feature that makes the app worth using: two Gmail accounts side by side, both logged in, neither aware of the other.',
    },
    {
      kind: 'code',
      label: 'sessions.ts',
      content: `export function servicePartition(serviceId: string): string {
  return \`persist:service-\${serviceId}\`;
}`,
    },
    {
      kind: 'text',
      content:
        "Chromium keeps each partition's cookies, storage and cache under `userData/Partitions/service-<id>`. Two views, two partitions, two independent logins. That part is easy.",
    },
    {
      kind: 'text',
      content:
        "The part I got wrong: removing a service didn't remove its partition. Re-adding one mints a fresh UUID, so it mints a fresh partition too, and the old one became permanently unreachable. A live session cookie sitting on disk that no code path could ever touch again. *Remove* left your login behind.",
    },
    {
      kind: 'text',
      content: 'The fix is a startup sweep, and the interesting constraint is *when* it can run:',
    },
    {
      kind: 'code',
      label: 'partitions.ts',
      content: `export function orphanedPartitionDirs(dirNames: string[], serviceIds: string[]): string[] {
  const live = new Set(serviceIds);
  return dirNames.filter((name) => {
    if (!name.startsWith(PARTITION_PREFIX)) return false;
    const id = name.slice(PARTITION_PREFIX.length);
    if (!/^[A-Za-z0-9._-]+$/.test(id)) return false;
    return !live.has(id);
  });
}`,
    },
    {
      kind: 'text',
      content:
        'It runs at startup, before any service view instantiates a session, so nothing being deleted is in use. And it only touches directory names plain enough that Chromium would have written them through unescaped. Anything ambiguous gets left alone rather than guessed at. A stale directory costs disk space. A wrong deletion costs someone their login.',
    },
    {
      kind: 'heading',
      content: 'Two renderers that have to agree on pixels',
    },
    {
      kind: 'text',
      content:
        'Main positions the native service view. React draws the sidebar, titlebar and modal chrome around it. If those two disagree by four pixels, you get a visible seam or an overlap.',
    },
    {
      kind: 'text',
      content:
        "For a while the constants were typed out in both layers with comments asking future readers to keep them in step. That's not a system. That's a wish. They're now one module:",
    },
    {
      kind: 'code',
      label: 'shared/layout.ts',
      content: `export const SIDEBAR_WIDTH = 68;
export const TITLEBAR_HEIGHT = 46;
export const FIND_BAR_HEIGHT = 44;`,
    },
    {
      kind: 'text',
      content:
        'It compiles into the main bundle via `tsconfig.electron.json` and into the renderer bundle via a Vite `@shared` alias. The rule for anything added there is strict: pure values and pure functions only, no `electron` or `node:` imports, because anything platform-specific breaks one of the two builds.',
    },
    {
      kind: 'text',
      content: 'Geometry that both layers need lives there too, not just constants:',
    },
    {
      kind: 'code',
      label: 'shared/layout.ts',
      content: `export function linkPreviewBounds(windowWidth: number, windowHeight: number): Bounds {
  const modalWidth = Math.min(LINK_PREVIEW_MAX_WIDTH, windowWidth - LINK_PREVIEW_MARGIN * 2);
  return {
    x: Math.round((windowWidth - modalWidth) / 2),
    y: LINK_PREVIEW_MARGIN + LINK_PREVIEW_HEADER,
    width: Math.max(0, modalWidth),
    height: Math.max(0, windowHeight - LINK_PREVIEW_MARGIN * 2 - LINK_PREVIEW_HEADER),
  };
}`,
    },
    {
      kind: 'text',
      content:
        'Main uses it to place the native view. The renderer uses the same function to draw the frame around it. One source, no drift.',
    },
    {
      kind: 'heading',
      content: 'Unread badges: an adapter registry, title first',
    },
    {
      kind: 'text',
      content:
        'Every web app reports unread counts differently. Rather than a growing `if (host.includes("gmail"))` chain in the view code, badge extraction is a registry of adapters:',
    },
    {
      kind: 'code',
      label: 'badge-adapters/types.ts',
      content: `export interface BadgeAdapter {
  readonly name: string;
  matches(host: string): boolean;
  readonly pollScript?: string;
  fetchCount?(session: Session): Promise<number | null>;
}`,
    },
    {
      kind: 'text',
      content: 'There are three layers, tried in order of reliability:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        "**The tab title.** `(N)` anywhere in `document.title` is the shared convention across Gmail, Messenger, Slack and most web apps. It always runs first, and it's deliberately *not* an adapter concern: adapters only add what the title can't provide.",
        '**A targeted DOM script**, injected by the poller when the title carries no count. Messenger and WhatsApp need this.',
        "**A main-process fetch** that bypasses the DOM entirely. Gmail's Atom feed, fetched with the service session's own cookies, is more accurate than anything you can scrape.",
      ],
    },
    {
      kind: 'text',
      content:
        'Adding support for a new service means adding one module to the registry array. Nothing in `main.ts` changes.',
    },
    {
      kind: 'text',
      content:
        "Two rules I'd keep on any version of this. Adapter selectors must be narrow, because broad heuristics produce phantom badges, and a badge you stop trusting is worse than no badge at all. And `fetchCount` must never reject: it resolves `null` when it can't tell, whether that's logged out, endpoint moved or network down, so callers fall through to the title path instead of the badge vanishing.",
    },
    {
      kind: 'heading',
      content: "Doing less work when nobody's looking",
    },
    {
      kind: 'text',
      content:
        "Ten services polling every three seconds is about 1,200 script injections an hour, most of them scraping pages nobody's looking at. Worse, each injection wakes the exact renderer process that hibernation exists to keep quiet.",
    },
    {
      kind: 'text',
      content: 'The rate is now a pure function of conditions:',
    },
    {
      kind: 'code',
      label: 'pollPolicy.ts',
      content: `export function pollIntervalMs(conditions: PollConditions): number | null {
  if (conditions.systemSuspended || conditions.windowMinimized) return POLL_PAUSED;
  if (conditions.onBattery && !(conditions.isActive && conditions.windowFocused)) {
    return POLL_PAUSED;
  }
  if (conditions.isActive && conditions.windowFocused) return POLL_ACTIVE_MS;
  return POLL_BACKGROUND_MS;
}`,
    },
    {
      kind: 'text',
      content:
        'Active and focused stays at 3 seconds. Background backs off to 20. Minimized, suspended or on battery pauses entirely. Pausing is safe because the caller does one catch-up poll when the condition lifts, and `page-title-updated` keeps firing while backgrounded anyway, so the instant path for most services is untouched.',
    },
    {
      kind: 'text',
      content:
        'Hibernation, unloading idle views to reclaim RAM, has the same shape. It also taught me the sharper lesson. Originally it only skipped the active service, and that broke a feature. A Messenger view running a scheduled automation task is a background view *by definition*: you switch away and let it run. So the sweep destroyed the view, the destroy hook stopped every task, and the panel showed an empty list. No error, no warning. Just gone.',
    },
    {
      kind: 'text',
      content: 'The policy now knows what *busy* means:',
    },
    {
      kind: 'code',
      label: 'hibernation.ts',
      content: `if (candidate.audible || candidate.hasAutomation || candidate.hasDownload) {
  return { hibernate: false, reason: "busy" };
}`,
    },
    {
      kind: 'text',
      content:
        'Audible means a call or a video. Automation means work the user scheduled. A download in flight means bytes on the wire. Each one is something the user deliberately set going and expects to survive in the background, which is precisely when the idle timer wants to fire.',
    },
    {
      kind: 'heading',
      content: 'The security boundary I nearly left open',
    },
    {
      kind: 'text',
      content: 'This is the one worth reading twice.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        "Service views run inside a session partition that holds that service's cookies *and its permission grants*. Messenger and WhatsApp partitions have camera and microphone allowed, because video calls need them. So the guard deciding which URLs may replace the page inside a view is not a UX nicety. It decides what code gets to run with a live login and a camera.",
    },
    {
      kind: 'text',
      content:
        'The original check matched domains with a bare `endsWith` in both directions. Which means a service on `notion.so` happily accepted `evilnotion.so`.',
    },
    {
      kind: 'code',
      label: 'domains.ts',
      content: `export function isSameDomain(host: string, domain: string): boolean {
  if (!host || !domain) return false;
  return host === domain || host.endsWith("." + domain);
}`,
    },
    {
      kind: 'text',
      content:
        'The dot is the entire fix. Both directions are still checked, because a service registered as `messenger.com` should accept `web.messenger.com` and the other way round, but each direction now requires a real domain boundary.',
    },
    {
      kind: 'heading',
      content: "Convincing Google you're a browser",
    },
    {
      kind: 'text',
      content:
        'A late one that cost me an evening. Google sign-in started refusing service views with *this browser or app may not be secure*.',
    },
    {
      kind: 'text',
      content:
        "`session.setUserAgent()` wasn't enough. Chromium also sends User-Agent Client Hints, and in Electron those hints cheerfully advertise the runtime:",
    },
    {
      kind: 'code',
      label: 'request headers',
      content: `Sec-CH-UA: "Chromium";v="140", "Electron";v="38", "Not=A?Brand";v="24"`,
    },
    {
      kind: 'text',
      content:
        "`setUserAgent()` doesn't touch those headers. They have to be rewritten on the way out, including the GREASE brand, so the set looks like a stock browser's rather than like something trying to look like one.",
    },
    {
      kind: 'heading',
      content: 'The pattern underneath all of it',
    },
    {
      kind: 'text',
      content:
        'Reading back through, the same shape shows up everywhere. Every hard decision in this app is a **pure function in its own module**, with the Electron parts kept outside it.',
    },
    {
      kind: 'text',
      content:
        '`shouldHibernate`, `pollIntervalMs`, `shouldKeepInView`, `orphanedPartitionDirs`, `linkPreviewBounds`, `parseTitleCount`, `spoofedUserAgent`. None of them import `electron`. They take plain data and return a decision. `serviceViews.ts` is the messy 1,300 line module that owns real runtime state, and it calls into them.',
    },
    {
      kind: 'text',
      content:
        "That wasn't a plan, it was a consequence. Electron code is genuinely painful to test: you need a display, an app lifecycle, a live window. So the logic I most wanted to be *sure* about kept migrating out into files that don't need any of it. The repo has 34 test files, and every one runs in plain Vitest with no Electron runtime at all.",
    },
    {
      kind: 'text',
      content:
        'The nice side effect is documentation. When a policy is one small file with one exported function, you can write down at the top *why it behaves that way*, the issue it fixed and the case it exists for, and that comment stays next to the rule instead of rotting in a PR thread.',
    },
    {
      kind: 'note',
      content:
        'The code is MIT licensed at [github.com/devlargs/largs-hub](https://github.com/devlargs/largs-hub). Windows builds are on the releases page. The macOS and Linux targets are configured but untested, and contributions there are very welcome.',
    },
  ],
};

export default learning;
