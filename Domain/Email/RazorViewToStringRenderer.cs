using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Hosting.Internal;
using System.Reflection;

namespace Domain.Email
{
    public class RazorViewToStringRenderer : IRazorViewToStringRenderer
    {
        private readonly IRazorViewEngine _viewEngine;
        private readonly ITempDataProvider _tempDataProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IHostingEnvironment _environment;

        public RazorViewToStringRenderer(
            IRazorViewEngine viewEngine,
            ITempDataProvider tempDataProvider,
            IHttpContextAccessor httpContextAccessor,
            IHostingEnvironment environment
            )

        {
            _viewEngine = viewEngine;
            _tempDataProvider = tempDataProvider;
            _httpContextAccessor = httpContextAccessor;
            _environment = environment;
        }

        public async Task<string> RenderViewToStringAsync<TModel>(string viewName, TModel model)
        {
            var actionContext = GetActionContext();
            var view = FindView(actionContext, viewName);

            await using var output = new StringWriter();
            var viewContext = new ViewContext(
                actionContext,
                view,
                new ViewDataDictionary<TModel>(new EmptyModelMetadataProvider(), new ModelStateDictionary())
                { Model = model },
                new TempDataDictionary(actionContext.HttpContext, _tempDataProvider),
                output,
                new HtmlHelperOptions());

            await view.RenderAsync(viewContext);

            return output.ToString();
        }

        private IView FindView(ActionContext actionContext, string viewName)
        {
            //TODO: fix this reallz dumb temporary solution
            var dir = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location).Split("api")[0] + "Domain";
            Console.WriteLine(dir + viewName);
            Console.WriteLine(dir + viewName);
            Console.WriteLine(dir + viewName);
            var contentRootPath = _environment.ContentRootPath;
            string executingAssemblyDirectoryAbsolutePath = System.IO.Path.GetDirectoryName(System.Reflection.Assembly.GetExecutingAssembly().Location);
            string executingAssemblyDirectoryRelativePath = System.IO.Path.GetRelativePath(contentRootPath, executingAssemblyDirectoryAbsolutePath);

            string executingFilePath = $"{executingAssemblyDirectoryAbsolutePath.Replace('\\', '/')}{viewName}".Replace("api", "Domain");
            string viewPath = "~" + viewName;
            string mainViewRelativePath = $"~/{executingAssemblyDirectoryRelativePath.Replace('\\', '/')}{viewName}".Replace("api", "Domain");
            Console.WriteLine(executingFilePath, mainViewRelativePath, viewPath, viewName);
            var getViewResult = _viewEngine.GetView(viewPath, viewPath, true);
            if (getViewResult.Success) return getViewResult.View;
            Console.WriteLine(getViewResult.ViewName, getViewResult.SearchedLocations, getViewResult.Success);

            var findViewResult = _viewEngine.FindView(actionContext, viewName, true);
            if (findViewResult.Success) return findViewResult.View;

            var searchedLocations = getViewResult.SearchedLocations.Concat(findViewResult.SearchedLocations);
            var errorMessage = string.Join(
                Environment.NewLine,
                new[] { $"Unable to find view '{viewName}'. The following locations were searched:" }.Concat(
                    searchedLocations));

            throw new InvalidOperationException(errorMessage);
        }

        private ActionContext GetActionContext()
        {
            return new ActionContext(_httpContextAccessor.HttpContext ?? new DefaultHttpContext(), new RouteData(), new ActionDescriptor());
        }
    }

    public interface IRazorViewToStringRenderer
    {
        Task<string> RenderViewToStringAsync<TModel>(string viewName, TModel model);
    }
}