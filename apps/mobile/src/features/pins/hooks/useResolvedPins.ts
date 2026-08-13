import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/core/api';

import { fetchPinCatalog } from '../api';
import { usePinStore } from '../store';
import { resolvePins, type ResolvedPin } from '../utils/resolvePin';
import { usePins } from './usePins';

export function useResolvedPins() {
  const { pins } = usePins();
  const removePinsMatching = usePinStore((s) => s.removePinsMatching);

  const catalogQuery = useQuery({
    queryKey: queryKeys.pinCatalog,
    queryFn: fetchPinCatalog,
  });

  const resolved = useMemo<ResolvedPin[]>(() => {
    if (!catalogQuery.data) {
      return [];
    }
    return resolvePins(pins, catalogQuery.data);
  }, [pins, catalogQuery.data]);

  useEffect(() => {
    if (!catalogQuery.data || pins.length === 0) {
      return;
    }
    const orphanIds = new Set(
      resolvePins(pins, catalogQuery.data)
        .filter((item) => !item.resolvable)
        .map((item) => item.pin.id),
    );
    if (orphanIds.size === 0) {
      return;
    }
    removePinsMatching((pin) => orphanIds.has(pin.id));
  }, [catalogQuery.data, pins, removePinsMatching]);

  return {
    resolved,
    isLoading: catalogQuery.isLoading,
    catalog: catalogQuery.data,
  };
}
