import React from 'react';

interface IPluralProps {
  count: number,
  single: string | React.ReactElement,
  plural: string | React.ReactElement,
  zero?: string,
  loading?: string
  prependValue?: boolean
};

export function Plural({ count, single, plural, zero, loading, prependValue }: IPluralProps) {
  if (loading) {
    return (
      <>{ loading }</>
    );
  }

  if (count <= 0 && zero && zero.length) {
    return (
      <>{ zero }</>
    );
  }

  if (count === 1) {
    return (
      <>{prependValue && <span>{count}&nbsp;</span>}{ single }</>
    );
  }

  return (
    <>{prependValue && <span>{count}&nbsp;</span>}{ plural }</>
  );
}

export default Plural;
