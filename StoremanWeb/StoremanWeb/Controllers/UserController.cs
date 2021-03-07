﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using StoremanWeb.Helpers;
using StoremanWeb.Models;
using StoremanWeb.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace StoremanWeb.Controllers
{
    [ApiController]
    [Route("api/v1/user")]
    public class UserController : ControllerBase
    {
        private readonly JWTTokenService jWTTokenService;
        private readonly UserService userService;
        private readonly IConfiguration configuration;

        public UserController(JWTTokenService jWTTokenService, UserService userService, IConfiguration configuration)
        {
            this.jWTTokenService = jWTTokenService;
            this.userService = userService;
            this.configuration = configuration;
        }

        [Authorize]
        [Route("ping")]
        public ActionResult Ping()
        {
            return new JsonResult(true);
        }

        [HttpPost]
        [Route("login")]
        public ActionResult Login([FromBody]LoginModel login)
        {
            if (!Regex.IsMatch(login.username, "[a-zA-Z0-9_.@]+"))
                return StatusCode(400);

            if (!userService.ValidatePassword(login.username, login.password))
                return StatusCode(401);

            UserModel user = userService.GetUser(login.username);
            Response.Cookies.Append("refresh_token", jWTTokenService.GetRefreshToken(user), new CookieOptions() { HttpOnly = true, Expires = System.DateTimeOffset.Now.AddHours(8) });
            return new JsonResult(new
            {
                token = jWTTokenService.GetToken(user),
                loggeduser = user.Name,
                loggeduserid = user.ID,
                username = user.Username
            });
        }

        [HttpPost]
        [Route("refreshtoken")]
        public ActionResult RefreshToken()
        {
            if (!Request.Cookies.Any(c => "refresh_token" == c.Key))
                return StatusCode(401);

            var refresh_token = Request.Cookies.First(c => "refresh_token" == c.Key).Value;
            var (valid, claim) = jWTTokenService.ValidateToken(refresh_token);

            if (!valid)
            {
                return StatusCode(401);
            }
            else
            {
                var userId = claim.NameIdentifier();
                UserModel user = userService.GetUser(int.Parse(userId));
                return new JsonResult(new
                {
                    token = jWTTokenService.GetToken(user),
                    loggeduser = user.Name,
                    loggeduserid = user.ID,
                    username = user.Username
                });
            }
        }
    }
}
