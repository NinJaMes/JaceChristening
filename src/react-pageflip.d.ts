declare module 'react-pageflip' {
  import * as React from 'react';

  export interface PageFlipProps {
    width: number;
    height: number;
    size?: 'fixed' | 'stretch';
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    drawShadow?: boolean;
    flippingTime?: number;
    usePortrait?: boolean;
    startZIndex?: number;
    autoSize?: boolean;
    maxShadowOpacity?: number;
    showCover?: boolean;
    mobileScrollSupport?: boolean;
    onFlip?: (e: { data: number }) => void;
    onChangeOrientation?: (e: { data: 'portrait' | 'landscape' }) => void;
    onChangeState?: (e: { data: 'user_fold' | 'fold_corner' | 'flipping' | 'read' }) => void;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
    startPage?: number;
    clickEventForward?: boolean;
    useMouseEvents?: boolean;
    swipeDistance?: number;
    showPageCorners?: boolean;
    disableFlipByClick?: boolean;
    ref?: React.Ref<any>;
  }

  const HTMLFlipBook: React.ForwardRefExoticComponent<PageFlipProps & React.RefAttributes<any>>;
  export default HTMLFlipBook;
}
