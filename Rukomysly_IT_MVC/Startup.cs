using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Rukomysly_IT_MVC.Startup))]
namespace Rukomysly_IT_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
