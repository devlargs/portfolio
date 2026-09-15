import { Learning } from '../types';

const learning: Learning = {
  slug: 'reviewing-my-own-repo-scope',
  title: 'What reviewing my own open-source repo taught me about scope',
  summary:
    "Reviewing Largs Hub like a stranger's codebase turned up bugs that were invisible rather than ugly. The bigger lesson was sizing: a fix that does not fit one reviewable pull request is a project, not an issue.",
  published: '2026-09-15',
  tags: ['electron', 'open-source', 'code-review', 'architecture'],
  body: [
    {
      kind: 'text',
      content:
        "I sat down to review Largs Hub the way I would review a stranger's codebase, and the useful lesson had nothing to do with code quality. It was that I could not size my own work. At all.",
    },
    {
      kind: 'text',
      content:
        'Largs Hub is my Electron app that stuffs Gmail, Slack, Discord, WhatsApp, and Messenger into one window with unified unread badges. Think Rambox or Franz. I wrote every line of it, which I assumed meant I knew what was in it.',
    },
    {
      kind: 'heading',
      content: 'What the review actually found',
    },
    {
      kind: 'text',
      content:
        'Not style nits. The findings that mattered were all the same species: things that were quietly wrong while looking completely fine.',
    },
    {
      kind: 'text',
      content:
        "`CLAUDE.md` claimed the project had no tests and no linter configured. Vitest, ESLint, and Prettier were all sitting right there in the repo. So every contributor and every coding agent reading that file started from a lie about the project's own state.",
    },
    {
      kind: 'text',
      content:
        'The release workflow published on every push to `main`, with a hardcoded committer identity and no CI gate in front of it. A broken commit on main was a shipped release.',
    },
    {
      kind: 'text',
      content:
        'There was a hardcoded idle auto-quit. In an app whose entire reason to exist is sitting open in the background collecting your notifications. I wrote that. I have no defense.',
    },
    {
      kind: 'text',
      content:
        "Node versions drifted across config files. And the updater's SHA-256 checksum was nullable, which means when it was missing, verification did not fail. It just skipped. Silently.",
    },
    {
      kind: 'text',
      content:
        'That last one is the pattern. The worst bugs in my repo were not ugly, they were invisible. Nothing was red. Nothing threw. The checksum check "passed" by not running, and the docs "described" a project that did not exist. No linter catches either. You only find them by reading with the assumption that you are wrong.',
    },
    {
      kind: 'heading',
      content: 'The scope part, which is the actual post',
    },
    {
      kind: 'text',
      content:
        'I filed the findings as issues #39 through #48, deliberately small, one PR each. Then I opened PRs #49 through #55 so I could review them one at a time instead of facing one enormous diff.',
    },
    {
      kind: 'text',
      content: 'Three issues never got a PR. #45, #46, and #48 were large refactors, and I deferred them.',
    },
    {
      kind: 'text',
      content:
        'That ratio is the whole lesson. Roughly a third of what I "found" was not a finding at all. It was a project that I had written down in the shape of a ticket, because writing it down as a ticket felt like progress and starting it did not.',
    },
    {
      kind: 'text',
      content:
        'So I now use a blunt test. If the fix does not fit in one pull request I can review in one sitting, it is not an issue. It is a project. Filing it as an issue does not make it smaller, it makes it permanent, because it sits in the backlog looking exactly as actionable as a two line fix while quietly being three weekends of work. A backlog where those two things look alike is a backlog you stop opening.',
    },
    {
      kind: 'text',
      content:
        'Deferring those three was the right call. Leaving them filed in the same format as the small stuff was not.',
    },
    {
      kind: 'heading',
      content: 'The contributor problem is an architecture problem',
    },
    {
      kind: 'text',
      content: 'The most interesting finding in the entire review was not a bug.',
    },
    {
      kind: 'text',
      content:
        'Adding a single new service to Largs Hub means editing four separate places, none of them documented. That is the real reason the project is hard to contribute to. Not a missing `CONTRIBUTING.md`. Not a shortage of `good-first-issue` labels. Four undocumented edit sites.',
    },
    {
      kind: 'text',
      content:
        'I had been thinking about open source friendliness as a paperwork task. It is not. It is an architecture task. The fix is collapsing service registration into one file per service, the way the badge adapter registry already works, so a contributor adds one file and is done. That single change does more for contributions than any amount of onboarding prose I could write.',
    },
    {
      kind: 'text',
      content:
        'My opinion, held strongly: if your first move toward being contributor friendly is writing documents, you are documenting the thing you should be deleting.',
    },
    {
      kind: 'heading',
      content: 'The part I would not have predicted',
    },
    {
      kind: 'text',
      content:
        'Reviewing my own code felt like reading my own old chat messages. Every questionable decision had a reason at the time, and not one of those reasons was written down anywhere. The auto-quit made sense during some week I no longer remember. The nullable checksum was almost certainly me making a test pass.',
    },
    {
      kind: 'text',
      content:
        'Which is the other reason to review your own repo cold. Not to find bugs, though you will. It is to find out which of your decisions have expired. Code does not tell you when its justification stopped being true. It just keeps running, and you keep assuming past you had a plan.',
    },
  ],
};

export default learning;
