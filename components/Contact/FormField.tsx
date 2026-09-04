import { FC, ReactNode } from 'react';
import styles from './FormField.module.css';

interface Props {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}

const FormField: FC<Props> = ({ label, htmlFor, error, children }) => (
  <div className={styles.field}>
    <label htmlFor={htmlFor} className={styles.label}>
      {label}
    </label>

    {children}

    {error && (
      <p id={`${htmlFor}-error`} role="alert" className={styles.error}>
        {error}
      </p>
    )}
  </div>
);

export default FormField;
