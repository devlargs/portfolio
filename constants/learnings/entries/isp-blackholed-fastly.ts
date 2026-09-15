import { Learning } from '../types';

const learning: Learning = {
  slug: 'isp-blackholed-fastly',
  title: 'My ISP blackholed Fastly and I spent a day blaming my code',
  summary:
    "GitHub loaded without styles and Reddit would not load at all. Not my cache, DNS or firewall: my ISP's route to one Fastly prefix was silently dropping packets, and a phone hotspot proved it in thirty seconds.",
  published: '2026-09-15',
  tags: ['networking', 'dns', 'fastly', 'debugging'],
  body: [
    {
      kind: 'text',
      content:
        "GitHub loaded, but naked. No styles, no JS, just blue links on white like it was 1998. Reddit didn't load at all, it just spun until the tab gave up. Everything else on the internet was fine.",
    },
    {
      kind: 'text',
      content: 'So I did what any developer does. I blamed everything I own.',
    },
    {
      kind: 'heading',
      content: 'The wrong suspects, in order',
    },
    {
      kind: 'list',
      ordered: true,
      items: [
        'Browser cache. Cleared it. Still broken.',
        'Extensions. Disabled all of them, opened an incognito window. Still broken.',
        'DNS. Flushed it, switched from my ISP resolver to 1.1.1.1, then to 8.8.8.8. Still broken.',
        'My own hosts file, on the theory that past me had done something stupid. Past me was innocent for once.',
        'Windows Defender, then the whole firewall. Off, tested, back on. Still broken.',
      ],
    },
    {
      kind: 'text',
      content:
        'I burned a genuinely embarrassing amount of time here. The reason is that all of those are things I control, and when something breaks, the first instinct is to look where you have power.',
    },
    {
      kind: 'heading',
      content: 'The thirty second test I should have run first',
    },
    {
      kind: 'text',
      content: "I turned on my phone's hotspot, connected the same laptop to it, and loaded GitHub.",
    },
    {
      kind: 'text',
      content: 'It worked perfectly.',
    },
    {
      kind: 'text',
      content:
        'Same machine. Same browser. Same DNS settings. Different transport. That single result kills every theory about your box in one shot, and it took less time than clearing a cache. I now run it before anything else.',
    },
    {
      kind: 'heading',
      content: 'What was actually happening',
    },
    {
      kind: 'text',
      content: 'My home connection is Converge ICT, wired ethernet, behind CGNAT. Converge runs as AS17639.',
    },
    {
      kind: 'text',
      content:
        "The things that were broken had one thing in common. Reddit sits behind Fastly. So do GitHub's static assets. Fastly is AS54113, and its biggest chunk of address space is 151.101.0.0/16.",
    },
    {
      kind: 'text',
      content:
        'DNS was resolving fine, which is exactly what made this confusing. I was getting real answers back with real Fastly IPs in them. The failure was one layer down. The TCP handshake went out and nothing ever came back. No refusal, no reset, no ICMP unreachable, just silence until the timeout.',
    },
    {
      kind: 'text',
      content:
        "That distinction is the whole thing. A DNS failure tells you something. A silent timeout tells you the packets are going somewhere that doesn't answer, and from a consumer connection you cannot see where. A traceroute would die at a hop inside the ISP and give me nothing useful after that.",
    },
    {
      kind: 'text',
      content:
        "Converge's route to that Fastly space was dropping traffic on the floor. Not all of Fastly, just that prefix, from that network, on that path. My phone was on a different carrier with a different route, so it was unaffected.",
    },
    {
      kind: 'heading',
      content: 'The hack that fixed half of it',
    },
    {
      kind: 'text',
      content:
        'Fastly is anycast, and their address space is much bigger than one /16. They publish the full list at `https://api.fastly.com/public-ip-list`, and it includes 199.232.0.0/16, 146.75.0.0/17, 185.31.16.0/22, and a stack of others.',
    },
    {
      kind: 'text',
      content:
        "If one prefix is unreachable and another one isn't, you can just point your machine at the one that works. Fastly serves the right site based on the TLS SNI in your request, not based on which edge IP you happened to land on, so a hand picked edge still returns the correct content.",
    },
    {
      kind: 'text',
      content: 'My hosts file now has a block like this:',
    },
    {
      kind: 'code',
      label: 'hosts',
      content: `# ==== Converge/Fastly workaround, added Sept 2026 ====
# Converge's route to 151.101.0.0/16 blackholes. Pin to a reachable Fastly edge.
# DELETE THIS once the route is fixed. Verify with: curl -I https://www.reddit.com
199.232.69.140  reddit.com
199.232.69.140  www.reddit.com
# ==== end workaround ====`,
    },
    {
      kind: 'text',
      content: 'Reddit came back immediately.',
    },
    {
      kind: 'note',
      tone: 'warn',
      content:
        'Two warnings before you copy that. You are bypassing the DNS based edge selection that normally sends you to the closest point of presence, so you will get a worse one and slightly higher latency. And a hosts file entry is permanent in a way the outage is not. Comment the block. Date it. Write the removal instruction inside it. Stale hosts entries outlive the problem they solved and then cause a completely different bug six months later that you will not connect to this.',
    },
    {
      kind: 'heading',
      content: 'Why GitHub stayed broken',
    },
    {
      kind: 'text',
      content: 'Here is the part I found genuinely interesting.',
    },
    {
      kind: 'text',
      content:
        "`github.githubassets.com` resolves into 185.199.108.0/22. That range is GitHub's own, listed in their published metadata at `https://api.github.com/meta`, and it is the same range that serves GitHub Pages and raw usercontent. But it is served across Fastly's edge network, which is why it died alongside everything else Fastly on my connection.",
    },
    {
      kind: 'text',
      content:
        "The problem is size. That block is 1024 addresses total, and the assets hostname answers on a handful of anycast IPs inside it. There is no second prefix to fall back to. With Fastly's own space I had a dozen ranges to pick from. With GitHub's, the entire pool sits behind the same broken path.",
    },
    {
      kind: 'text',
      content:
        "So there was no alternate to pin, and GitHub's UI stayed unstyled until the route recovered on its own. I coded over cellular in the meantime.",
    },
    {
      kind: 'heading',
      content: 'The part that actually annoys me',
    },
    {
      kind: 'text',
      content:
        'Behind CGNAT you have no control and no visibility. You cannot see the AS path. You cannot ask for a different route. And filing a support ticket that says "your peering to AS54113 is dropping packets to 151.101.0.0/16" gets you a scripted reply about restarting your modem, because the person reading it has no path to the network team either.',
    },
    {
      kind: 'text',
      content:
        'That is not a Converge problem specifically, it is what residential internet is. You are buying an average, not a route.',
    },
    {
      kind: 'text',
      content:
        'What I changed afterward is small and it has already paid for itself. I keep the hotspot configured and one tap away, and I switch transports before I touch anything else. Not because it fixes the problem. Because it tells me in half a minute whether the problem is even mine.',
    },
    {
      kind: 'text',
      content: "Most of the day I lost wasn't debugging. It was assuming.",
    },
  ],
};

export default learning;
