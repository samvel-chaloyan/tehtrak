import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import {
  searchCachedCatalog,
  type GlobalSearchResults,
} from '../utils/searchCachedCatalog';

const EMPTY: GlobalSearchResults = {
  workspaces: [],
  collections: [],
  items: [],
  total: 0,
};

/**
 * Live filter over TanStack Query cache. Re-runs when the cache changes
 * (e.g. after visiting a collection and loading its items).
 */
export function useCachedGlobalSearch(query: string): GlobalSearchResults {
  const queryClient = useQueryClient();
  const [cacheVersion, setCacheVersion] = useState(0);

  useEffect(() => {
    return queryClient.getQueryCache().subscribe(() => {
      setCacheVersion((version) => version + 1);
    });
  }, [queryClient]);

  return useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      return EMPTY;
    }
    return searchCachedCatalog(queryClient, trimmed);
    // cacheVersion intentionally forces refresh when any query updates
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryClient, query, cacheVersion]);
}
