import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import * as React from 'react';

interface MyAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> {
  name: string;
  label: string;
  // lookup: {id: number | string; label: string}[]
}

function MyAutocomplete<
  T,
  Multiple extends boolean | undefined,
  DisableClearable extends boolean | undefined,
  FreeSolo extends boolean | undefined
>(props: MyAutocomplete<T, Multiple, DisableClearable, FreeSolo>) {
  return <Autocomplete {...props} />;
}

export default MyAutocomplete;