﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using StoremanWeb.Services;

namespace StoremanWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<JWTTokenService>();
            services.AddSingleton<SecurityService>();
            services.AddSingleton<UserService>();
            services.AddSingleton<DBService>();
            services.AddSingleton<ExcelService>();

            services
                .AddAuthentication(DefaultJwtScheme)
                .AddJwtBearer(JwtBearerConfig);

            services.AddRouting();

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UsePathBase(new PathString("/storeman"));
            }

            app.UseStaticFiles();

            app.UseAuthentication();

            app.UseMvc();

            app.UseSpa(spa =>
            {
                if (env.IsDevelopment())
                {
                    spa.Options.StartupTimeout = TimeSpan.FromMinutes(1);
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:1234");
                }
            });
        }


        private static void DefaultJwtScheme(Microsoft.AspNetCore.Authentication.AuthenticationOptions opt)
        {
            opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }

        private void JwtBearerConfig(JwtBearerOptions opt)
        {
            opt.TokenValidationParameters = JWTTokenService.StandardValidationParameters(Configuration);
        }
    }
}
