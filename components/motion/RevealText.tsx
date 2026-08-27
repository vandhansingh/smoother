'use client';

import SplitText from './SplitText';

type Props = {
  lines: string[];
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'span';
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
};

/** Line-level reveal: clip-path mask + translateY, one line at a time.
    Used for the giant editorial statements. */
export default function RevealText({
  lines,
  as = 'h2',
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.075,
  duration = 0.85,
}: Props) {
  return (
    <SplitText
      text={lines}
      by="line"
      as={as}
      className={className}
      lineClassName={lineClassName}
      delay={delay}
      stagger={stagger}
      duration={duration}
    />
  );
}
