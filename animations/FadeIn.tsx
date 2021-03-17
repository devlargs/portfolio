import { motion, useAnimation, Variants } from "framer-motion";
import { ReactElement, useEffect, FC } from "react";
import { useInView } from "react-intersection-observer";

type Props = {
  children: ReactElement;
  duration?: number;
  variant?: Variants;
};

const defaultVariant = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 100, opacity: 0 },
};

const FadeIn: FC<Props> = ({
  duration = 0.3,
  variant = defaultVariant,
  children,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (process.browser && inView) {
      controls.start("visible");
    } else {
      controls.start("visible");
    }
  }, [controls, inView]);

  if (process.browser) {
    return (
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        transition={{ duration }}
        variants={variant}
      >
        {children}
      </motion.div>
    );
  } else {
    return <>{children}</>;
  }
};

export default FadeIn;
