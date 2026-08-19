import { Box, Text } from '@chakra-ui/react';
import Reveal from '@components/Reveal';
import { ACTIVE_SOCIALS } from '@constants/profile';
import { FC } from 'react';
import ContactForm from './ContactForm';

const Contact: FC = () => (
  <Box
    display="grid"
    gap={{ base: 'var(--space-xl)', md: 'var(--space-2xl)' }}
    gridTemplateColumns={{ base: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' }}
    alignItems="start"
  >
    <Reveal>
      <Text
        fontFamily="var(--font-display)"
        fontSize="var(--text-3xl)"
        lineHeight={1.2}
        letterSpacing="-0.02em"
        color="var(--color-ink)"
        maxW="20ch"
        m="0"
      >
        Working on something that needs building properly?
      </Text>

      <Text
        mt="var(--space-md)"
        fontSize="var(--text-md)"
        lineHeight={1.7}
        color="var(--color-ink-2)"
        maxW="var(--measure-narrow)"
      >
        Roles, contracts and one-off builds are all welcome. Tell me what you are making and I will tell you honestly
        whether I am the right person for it.
      </Text>

      {ACTIVE_SOCIALS.length > 0 && (
        <Box mt="var(--space-lg)" display="flex" flexDirection="column" gap="var(--space-2xs)">
          {ACTIVE_SOCIALS.map((social) => (
            <Box
              as="a"
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              display="flex"
              alignItems="baseline"
              justifyContent="space-between"
              gap="var(--space-sm)"
              maxW="var(--measure-narrow)"
              py="var(--space-2xs)"
              borderTop="var(--rule-hair) solid var(--color-rule)"
              fontFamily="var(--font-meta)"
              fontSize="var(--text-xs)"
              letterSpacing="0.04em"
              color="var(--color-ink-2)"
              transition="color var(--dur-1) var(--ease-out)"
              _hover={{ color: 'var(--color-accent)' }}
            >
              <Box as="span" whiteSpace="nowrap">
                {social.label}
              </Box>
              <Box as="span" color="var(--color-ink-3)" whiteSpace="nowrap">
                {social.handle || '→'}
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Reveal>

    <Reveal delay={100}>
      <ContactForm />
    </Reveal>
  </Box>
);

export default Contact;
