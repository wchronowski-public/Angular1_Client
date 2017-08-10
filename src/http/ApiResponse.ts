export type ApiError = {};

export type ApiResponse<T> = {
  errors: ApiError[];
  data?: T;
};
