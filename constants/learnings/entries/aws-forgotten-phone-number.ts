import { Learning } from '../types';

const learning: Learning = {
  slug: 'aws-forgotten-phone-number',
  title: "The AWS bill I didn't expect: how a forgotten phone number in another region cost me",
  summary:
    'A phone number claimed in a region you never revisit bills a flat lease forever, too small to notice. Why the console hides it, the sweep that finds it, and the alarm that catches a dollar a month.',
  published: '2026-09-15',
  tags: ['aws', 'billing', 'amazon-connect', 'cloudwatch'],
  body: [
    {
      kind: 'text',
      content: 'The charge was never big enough to be alarming. That is the entire problem.',
    },
    {
      kind: 'text',
      content:
        'A phone number is one of the few things you can leave behind in an AWS account that bills you for doing nothing. No traffic. No invocations. No logs to notice. It sits in a region you stopped opening, quietly renting itself back to you, and the only evidence is a line item small enough that you scroll past it.',
    },
    {
      kind: 'text',
      content:
        'I found mine by accident, in a region I had picked once for a reason I no longer remembered. Here is how it happens, why the console is genuinely bad at showing you, and the sweep I run now.',
    },
    {
      kind: 'heading',
      content: 'Why a number, of all things',
    },
    {
      kind: 'text',
      content:
        'Most AWS bill surprises are usage. Something ran hot, something got scraped, something looped. You can see it in a graph.',
    },
    {
      kind: 'text',
      content: 'Number leases are different. They are flat, recurring rent:',
    },
    {
      kind: 'list',
      items: [
        'Amazon Connect charges per day per claimed number. A US DID is $0.03 per day and a US toll-free number is $0.06 per day, which is under a dollar a month and reads as a rounding error.',
        'International numbers are not a rounding error. A DID in Costa Rica has been priced at roughly $0.29 per day, and a toll-free number in Panama at around $0.67 per day. Same "I\'ll just claim one to test" gesture, ten to twenty times the cost.',
        'On the SMS side, under what is now AWS End User Messaging, you pay a monthly lease for the number plus a monthly fee for the 10DLC campaign it is attached to. The classic shape is $1 for the long code and $10 for a standard campaign, or $2 for a low volume campaign meant for exactly the proof of concept you abandoned.',
        "The AWS docs are blunt about the part that catches people: you are charged the monthly lease regardless of the number's status. A 10DLC number stuck in Pending still bills. A registration that never completed is still rent.",
      ],
    },
    {
      kind: 'text',
      content:
        'None of that produces a spike. It produces a floor. And a floor is invisible if you only look at your bill when it jumps.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        "There is a second trap layered on top. Amazon Connect's free tier includes a DID for the first twelve months. Claim a number during a weekend experiment, forget it, and the charges start a year later, with no action on your part to connect them to. By then the experiment is not in your memory at all.",
    },
    {
      kind: 'heading',
      content: 'Why the console hid it from me',
    },
    {
      kind: 'text',
      content:
        'The AWS console is region scoped, and it opens wherever you left it. Everything you are not currently pointed at simply does not exist on screen.',
    },
    {
      kind: 'text',
      content:
        'Phone numbers are unusually good at exploiting this, because provisioning one often forces a region switch in the first place. Number availability is tied to country and region support, so you go looking, you find the combination that works, you claim the number there, and you never have a reason to return to that region again. The resource lives in the one place you have no habit of visiting.',
    },
    {
      kind: 'text',
      content:
        'Then the bill arrives and tells you almost nothing. The default view groups by service. "Amazon Connect: $2.14" does not tell you where, and it does not tell you why, and $2.14 does not make you want to find out.',
    },
    {
      kind: 'heading',
      content: 'Finding it',
    },
    {
      kind: 'text',
      content:
        'Cost Explorer will tell you, but only if you ask it the right question. Group by region first, then by service, then by usage type. Usage type is where the truth lives, because the string itself names the thing: something like `USE1-DID-Number-Days` or a `PhoneNumberLease` line. Once you see the usage type you know exactly what you are paying for.',
    },
    {
      kind: 'text',
      content: 'From the CLI, running against us-east-1 because that is where the Cost Explorer endpoint lives:',
    },
    {
      kind: 'code',
      label: 'terminal',
      content: `aws ce get-cost-and-usage \\
  --time-period Start=2026-06-01,End=2026-09-01 \\
  --granularity MONTHLY \\
  --metrics UnblendedCost \\
  --group-by Type=DIMENSION,Key=REGION Type=DIMENSION,Key=USAGE_TYPE`,
    },
    {
      kind: 'note',
      content:
        'Cost Explorer API requests are billed at a cent each, so this is a tool to use deliberately rather than to poll.',
    },
    {
      kind: 'text',
      content: 'Then go looking directly. This is the sweep, one loop per service that hands out numbers:',
    },
    {
      kind: 'code',
      label: 'sweep-numbers.sh',
      content: `# SMS and voice numbers (AWS End User Messaging)
for r in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
  aws pinpoint-sms-voice-v2 describe-phone-numbers --region "$r" \\
    --query 'PhoneNumbers[].[PhoneNumber,Status,MonthlyLeasingPrice]' \\
    --output text 2>/dev/null | sed "s/^/$r /"
done

# Contact center numbers (Amazon Connect)
for r in $(aws ec2 describe-regions --query 'Regions[].RegionName' --output text); do
  aws connect list-phone-numbers-v2 --region "$r" \\
    --query 'ListPhoneNumbersSummaryList[].[PhoneNumber,PhoneNumberType,PhoneNumberCountryCode]' \\
    --output text 2>/dev/null | sed "s/^/$r /"
done`,
    },
    {
      kind: 'text',
      content:
        'Two caveats. `describe-regions` returns the regions enabled for your account, so a number sitting in an opt-in region you enabled once and forgot will not appear unless you add `--all-regions`. And if you have ever touched the Chime SDK, `aws chime-sdk-voice list-phone-numbers` is a third inventory that is easy to forget exists.',
    },
    {
      kind: 'heading',
      content: 'Releasing it is not just clicking delete',
    },
    {
      kind: 'text',
      content: 'Two things to know before you start cleaning up.',
    },
    {
      kind: 'text',
      content:
        'End User Messaging numbers have deletion protection you may have to turn off first, which is correct behavior for a production number and an annoyance for a dead one. Releasing is a two step.',
    },
    {
      kind: 'text',
      content:
        'Amazon Connect has a quota on churn. Over any rolling 180 day window you cannot release more than double your number quota, and if you cross it you are blocked from claiming until you open a support ticket. So do not sit there claiming and releasing numbers to see what is available. Search first, claim once.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content: 'Deleting the Connect instance is not the same conversation as the number. Check both.',
    },
    {
      kind: 'heading',
      content: 'The alarm I should have had',
    },
    {
      kind: 'text',
      content:
        'Here is the part I find genuinely funny. The safety net has the same region problem as the thing it was supposed to catch.',
    },
    {
      kind: 'text',
      content:
        'CloudWatch billing metrics are published only to us-east-1. Not "mostly." Only. If you sit in ap-southeast-1 all day and go to CloudWatch to build a billing alarm, the `AWS/Billing` namespace is not there, and the console gives you no useful hint as to why. You have to enable billing alerts in the Billing console first, then switch to N. Virginia, then use the `EstimatedCharges` metric with statistic Maximum and a six hour period, because that is roughly how often the data updates.',
    },
    {
      kind: 'text',
      content: 'What I would actually set up, in order of value:',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        '**A zero spend budget.** AWS ships a template for it. It fires the moment your bill exceeds the free tier by any amount at all. This is the one that catches a dollar a month, and nothing else does. Your first two budgets are free, and additional ones run about two cents a day.',
        '**A real threshold budget** on top of that, set somewhere near what you expect to spend, so the zero spend alert does not become noise you filter.',
        '**Daily granularity in Cost Explorer**, grouped by region, checked once a month. Two minutes. Monthly granularity smooths small recurring charges into invisibility, which is exactly the failure mode you are trying to fix.',
      ],
    },
    {
      kind: 'text',
      content:
        'Cost Anomaly Detection is free and worth enabling, but do not expect it to save you here. It is looking for deviation, and a steady lease fee is the least anomalous thing in your account.',
    },
    {
      kind: 'heading',
      content: 'The actual lesson',
    },
    {
      kind: 'text',
      content: 'It is not "check your bill." Everyone says that and it does not work, because the bill looked fine.',
    },
    {
      kind: 'text',
      content:
        'It is that region is a dimension of your infrastructure that nothing in your daily workflow reminds you about. Your code has one region in its config. Your console has one region in the dropdown. Your memory has one region in it. Anything you provisioned outside that has effectively left your field of view while staying on your invoice.',
    },
    {
      kind: 'text',
      content:
        'So once a quarter, loop over the regions and look. It takes a shell script and five minutes, and the things you find are never things you meant to keep.',
    },
  ],
};

export default learning;
