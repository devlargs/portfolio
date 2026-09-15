import { Learning } from '../types';

const learning: Learning = {
  slug: 'google-play-closed-testing',
  title: 'How to publish a closed testing app on Google Play',
  summary:
    'New personal Play accounts need 12 testers opted in for 14 straight days before production. The rule is really a retention problem, and internal testing is where you earn the right not to waste it.',
  published: '2026-09-15',
  tags: ['android', 'google-play', 'testing', 'release'],
  body: [
    {
      kind: 'text',
      content:
        'Fourteen days is not the hard part. Keeping twelve humans opted in for fourteen straight days is the hard part, and nobody warns you that the rule is really a retention problem wearing a compliance costume.',
    },
    {
      kind: 'text',
      content:
        'Here is what the gate actually is, as of September 2026. If you have a personal Google Play developer account created after November 13, 2023, you cannot ship to production until you run a closed test with at least 12 testers opted in continuously for 14 days. Google dropped that minimum from 20 to 12 on December 11, 2024, and left the two weeks alone. Organization accounts and older personal accounts skip the whole thing.',
    },
    {
      kind: 'text',
      content:
        'Two details inside that sentence do most of the damage. Only the closed track counts, internal testing does not. And "opted in" means the person accepted the invite and installed the app under the same Google account. Invited and ignored is worth nothing.',
    },
    {
      kind: 'heading',
      content: 'Run internal testing first anyway',
    },
    {
      kind: 'text',
      content: 'I took Telypas through internal testing before closed testing, and I would do it that way every time.',
    },
    {
      kind: 'text',
      content:
        'Internal testing takes up to 100 testers, releases go out fast, and you get to find the embarrassing stuff in front of people who already like you. For us that list was not exotic. The Android keyboard covered the login and sign up fields. A back swipe sent a signed in user back to the login screen. Tablet layouts were wrong. Profiles had no pull to refresh.',
    },
    {
      kind: 'text',
      content:
        'Every one of those is a first five minutes bug. Now imagine those shipping into a closed test. Your tester opens the app, cannot type their password, closes it, and never opens it again. They are still technically opted in, so your count looks fine, and you fail anyway, because when you apply for production access Google asks about tester engagement and a wall of install-once-and-vanish testers reads exactly like what it is.',
    },
    {
      kind: 'text',
      content: 'Internal testing is where you buy the right to not waste your closed test.',
    },
    {
      kind: 'heading',
      content: 'Mechanics that quietly break people',
    },
    {
      kind: 'list',
      items: [
        '**Uninstalling is not opting out.** Testers opt out through the testing web link, where there is an actual opt-out button. Google has said an opt-in still counts even if the person uninstalls. Do not treat that as a strategy.',
        '**Use a Google Group, not a raw email list.** Managing the tester list through a group means you add and remove people without touching a release. Emailing a list of addresses into the console and editing it later is how you end up publishing a new build for an administrative reason.',
        '**Recruit above the minimum.** Twelve is the threshold, not the target. If one person opts out on day seven you are below the line and you have handed back the clock. Fifteen to twenty gives you room to lose a few.',
        '**Budget for review.** The release itself gets reviewed, usually around a day, and new accounts can sit for up to three. That is before your fourteen days even start ticking.',
        '**Do not buy testers.** The listings are everywhere and the price is tempting. The number was never the point, engagement is, and Google looks at the engagement. You are paying for twelve accounts that will do exactly what you paid for, which is nothing.',
      ],
    },
    {
      kind: 'heading',
      content: 'The decision that mattered most',
    },
    {
      kind: 'text',
      content: 'Shipping fixes during the test, fast.',
    },
    {
      kind: 'text',
      content:
        'On Telypas we ran a CI/CD pipeline and put a minimum version gate in the app, so a tester on a broken build gets pushed onto a current one instead of sitting on the thing that annoyed them last Tuesday. That combination did more for us than anything else in the setup. Closed testing is not a waiting room where you keep the app frozen for two weeks and pray. The testers who stay are the ones who watch their bug reports turn into builds.',
    },
    {
      kind: 'text',
      content:
        'When a QA professional I know gave us detailed UI feedback, we fixed it and shipped it while it was still fresh to them. That is what keeps people opted in. Not reminder emails.',
    },
    {
      kind: 'heading',
      content: 'The production access form',
    },
    {
      kind: 'text',
      content:
        'Once you clear the threshold you apply from the Play Console dashboard, and you answer questions in three areas: how your app is designed, how you tested it, and why it is ready for production. Google says review is usually seven days or less. Hitting twelve times fourteen makes you eligible to apply, it does not make the answer yes.',
    },
    {
      kind: 'text',
      content:
        'My advice on the form is simple and slightly against instinct: accuracy beats polish. It is an attestation, not a pitch deck. Do not write marketing copy about your vision. Write what happened. These are the people who tested, this is what they found, these are the specific things we changed because of it, this is the release process that gets fixes to users. Concrete and unglamorous reads as true, because it is.',
    },
    {
      kind: 'heading',
      content: 'Two other 2026 gates worth knowing',
    },
    {
      kind: 'text',
      content:
        "New apps have to target API 36, which is Android 16, from August 31, 2026. And Google's developer verification requirement started rolling out on September 30, 2026, beginning with Brazil, Indonesia, Singapore, and Thailand.",
    },
    {
      kind: 'note',
      content:
        'If you are reading this later than I wrote it, check the dates yourself. This corner of the console changes more than any other.',
    },
    {
      kind: 'heading',
      content: 'What I would tell myself before starting',
    },
    {
      kind: 'text',
      content:
        'Start recruiting testers before your app is ready. The build is not the bottleneck. Twelve real people who will keep an app installed for two weeks is the bottleneck, and it takes longer to line up than the feature you think is blocking release. Everything else on this page is process. That part is just asking.',
    },
  ],
};

export default learning;
