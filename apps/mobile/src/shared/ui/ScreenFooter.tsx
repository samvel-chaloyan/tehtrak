import { ReactNode } from 'react';

import { OutlineButton, OutlineButtonProps } from './OutlineButton';
import { ScreenBottomBar } from './ScreenBottomBar';

interface ScreenFooterProps {
  children: ReactNode;
}

export function ScreenFooter({ children }: ScreenFooterProps) {
  return <ScreenBottomBar>{children}</ScreenBottomBar>;
}

interface SingleBottomButtonProps {
  action: OutlineButtonProps;
}

export function SingleBottomButton({ action }: SingleBottomButtonProps) {
  return <OutlineButton {...action} />;
}
