import Reveal from '@components/Reveal';
import { ACTIVE_SOCIALS } from '@constants/profile';
import { FC } from 'react';
import styles from './Contact.module.css';
import ContactForm from './ContactForm';

const Contact: FC = () => (
  <div className={styles.grid}>
    <Reveal>
      <p className={styles.pitch}>Working on something that needs building properly?</p>

      <p className={styles.body}>
        Roles, contracts and one-off builds are all welcome. Tell me what you are making and I will tell you honestly
        whether I am the right person for it.
      </p>

      {ACTIVE_SOCIALS.length > 0 && (
        <div className={styles.socials}>
          {ACTIVE_SOCIALS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className={styles.social}
            >
              <span className={styles.socialLabel}>{social.label}</span>
              <span className={styles.socialHandle}>{social.handle || '→'}</span>
            </a>
          ))}
        </div>
      )}
    </Reveal>

    <Reveal delay={100}>
      <ContactForm />
    </Reveal>
  </div>
);

export default Contact;
