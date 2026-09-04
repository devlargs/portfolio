'use client';

import { GISCUS, GISCUS_ORIGIN, GISCUS_SRC, giscusTheme } from '@constants/giscus';
import useThemeMode, { readThemeMode } from 'hooks/useThemeMode';
import { FC, useEffect, useRef } from 'react';
import styles from './Comments.module.css';

const Comments: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mode = useThemeMode();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement('script');
    script.src = GISCUS_SRC;
    script.async = true;
    script.crossOrigin = 'anonymous';

    script.setAttribute('data-repo', GISCUS.repo);
    script.setAttribute('data-repo-id', GISCUS.repoId);
    script.setAttribute('data-category', GISCUS.category);
    script.setAttribute('data-category-id', GISCUS.categoryId);
    script.setAttribute('data-mapping', GISCUS.mapping);
    script.setAttribute('data-strict', GISCUS.strict);
    script.setAttribute('data-reactions-enabled', GISCUS.reactionsEnabled);
    script.setAttribute('data-emit-metadata', GISCUS.emitMetadata);
    script.setAttribute('data-input-position', GISCUS.inputPosition);
    script.setAttribute('data-lang', GISCUS.lang);
    script.setAttribute('data-theme', giscusTheme(readThemeMode()));

    container.appendChild(script);

    return (): void => {
      container.replaceChildren();
    };
  }, []);

  useEffect(() => {
    const iframe = containerRef.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme(mode) } } }, GISCUS_ORIGIN);
  }, [mode]);

  return (
    <section aria-labelledby="comments-head" className={styles.comments}>
      <h2 id="comments-head" className={styles.title}>
        Comments
      </h2>
      <p className={styles.lede}>Sign in with GitHub to leave a note. Threads live in this repo&rsquo;s discussions.</p>
      <div ref={containerRef} className={styles.thread} />
    </section>
  );
};

export default Comments;
