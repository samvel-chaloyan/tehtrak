using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Tehtrak.Application.Common;

namespace Tehtrak.Api.Filters;

public sealed class ServiceExceptionFilter : IExceptionFilter
{
    public void OnException(ExceptionContext context)
    {
        if (context.Exception is not ServiceException ex)
        {
            return;
        }

        context.Result = new ObjectResult(ApiResponse<object>.Fail(ex.Code, ex.Message, ex.Details))
        {
            StatusCode = ex.StatusCode,
        };
        context.ExceptionHandled = true;
    }
}
