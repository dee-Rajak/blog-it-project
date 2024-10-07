using Azure.Identity;
using BlogItAPI.Data;
using BlogItAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BlogItAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(AppDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Register
        [HttpPost("register")]
        public IActionResult Register(Author author)
        {
            if(_context.Authors.Any(a=>a.Email == author.Email))
            {
                return BadRequest("Email already exists");
            }

            _context.Authors.Add(author);
            _context.SaveChanges();
            return Ok("Registration successful.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Author author)
        {
            var loggingAuthor = _context.Authors.SingleOrDefault(a => a.Email == author.Email && a.Password == author.Password);

            if(loggingAuthor == null)
            {
                return Unauthorized();
            }

            var token = GenerateJwtToken(loggingAuthor);
            return Ok(new {Token= token});
        }

        private object GenerateJwtToken(Author author)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, author.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, author.Email),
            
        };

            var token = new JwtSecurityToken(
           issuer: _configuration["JwtSettings:Issuer"],
           audience: _configuration["JwtSettings:Audience"],
           claims: claims,
           expires: DateTime.Now.AddMinutes(Convert.ToDouble(_configuration["JwtSettings:ExpiryMinutes"])),
           signingCredentials: creds
       );

            return new JwtSecurityTokenHandler().WriteToken(token);

        }
    }

   
}