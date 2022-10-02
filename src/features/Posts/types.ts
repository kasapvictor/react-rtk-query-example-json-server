import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal } from 'react';

export interface postProps {
  id: Key | null | undefined;
  title:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | ReactFragment
    | ReactPortal
    | null
    | undefined;
}
