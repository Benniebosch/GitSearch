using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GitSearch.Api.AppCode
{
    public class ValidateModelAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext
                                               context)
        {
            if (!context.ModelState.IsValid)
            {
                context.Result = new BadRequestObjectResult(
                                                    context.ModelState);
            }
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            //var result = context.Result;
            base.OnActionExecuted(context);
        }
    }
}
