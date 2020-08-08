//using Microsoft.AspNetCore.Http;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Security.Claims;
//using System.Threading.Tasks;

//namespace GitSearch.Api.AppCode
//{
//    public class UserClaimsMiddleware
//    {
//        private readonly RequestDelegate _next;

//        public UserClaimsMiddleware(RequestDelegate next)
//        {
//            _next = next;
//        }

//        public async Task InvokeAsync(HttpContext httpContext)
//        {
//            if (httpContext.User != null && httpContext.User.Identity.IsAuthenticated)
//            {
//                var userId = httpContext.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
//                //httpContext.Items.Add[]
//            }

//            await _next(httpContext);
//        }
//    }
//}
