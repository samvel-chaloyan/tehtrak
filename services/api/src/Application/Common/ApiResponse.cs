namespace Tehtrak.Application.Common;

public sealed class ApiResponse<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
    public object? Meta { get; init; }
    public ApiError? Error { get; init; }

    public static ApiResponse<T> Ok(T data, object? meta = null) => new()
    {
        Success = true,
        Data = data,
        Meta = meta,
        Error = null,
    };

    public static ApiResponse<T> Fail(string code, string message, object? details = null) => new()
    {
        Success = false,
        Data = default,
        Meta = null,
        Error = new ApiError { Code = code, Message = message, Details = details },
    };
}
