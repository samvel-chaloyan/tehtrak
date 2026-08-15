import { ApiErrorBody } from './types';

export class ApiClientError extends Error {
  code: string;
  status: number;
  details?: Record<string, unknown>;

  constructor(message: string, code: string, status: number, details?: Record<string, unknown>) {
    super(message);
    this.name = 'ApiClientError';
    this.code = code;
    this.status = status;
    this.details = details;
  }

  static fromBody(status: number, error: ApiErrorBody | null | undefined): ApiClientError {
    return new ApiClientError(
      error?.message ?? 'Something went wrong. Please try again.',
      error?.code ?? 'INTERNAL_ERROR',
      status,
      error?.details as Record<string, unknown> | undefined,
    );
  }

  /** Human-friendly copy for operational UI */
  get displayMessage(): string {
    switch (this.code) {
      case 'UNAUTHORIZED':
        return 'Your session expired. Please sign in again.';
      case 'VALIDATION_ERROR': {
        const firstDetail = firstValidationDetail(this.details);
        return firstDetail ?? 'Please check the highlighted fields and try again.';
      }
      case 'WORKSPACE_ACCESS_DENIED':
      case 'INSUFFICIENT_ROLE':
        return 'You do not have permission for this action.';
      case 'CONFLICT':
        return this.message;
      default:
        return this.message;
    }
  }
}

function firstValidationDetail(details?: Record<string, unknown>): string | null {
  if (!details) return null;
  for (const value of Object.values(details)) {
    if (Array.isArray(value) && typeof value[0] === 'string' && value[0].length > 0) {
      return value[0];
    }
    if (typeof value === 'string' && value.length > 0) {
      return value;
    }
  }
  return null;
}
