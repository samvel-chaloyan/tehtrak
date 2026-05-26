namespace Tehtrak.Application.Common;

public sealed class ServiceException : Exception
{
    public string Code { get; }
    public int StatusCode { get; }
    public object? Details { get; }

    public ServiceException(string code, string message, int statusCode = 400, object? details = null)
        : base(message)
    {
        Code = code;
        StatusCode = statusCode;
        Details = details;
    }
}
