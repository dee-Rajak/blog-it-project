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

        [HttpPost("register")]
        public async Task<IActionResult> Register(Author author)
        {
            author.Email = author.Email.ToLower();

            if (await _context.Authors.AnyAsync(a => a.Email == author.Email))
            {
                return BadRequest("Email already exists.");
            } else if (await _context.Authors.AnyAsync(a=> a.Name == author.Name))
            {
                return BadRequest("Username already taken.");
            } else
            {
                await _context.Authors.AddAsync(author);
                await _context.SaveChangesAsync();
                //return CreatedAtAction(nameof(GetAuthorById), new { id = author.Id }, author);
                return Ok(author);
            }


            //try
            //{
            //await _context.Authors.AddAsync(author);
            //await _context.SaveChangesAsync();
            //return Ok("Registration successful.");
            //}
            //catch (DbUpdateException ex)
            //{
            //    if (ex.InnerException?.Message.Contains("UNIQUE constraint failed") == true)
            //    {
            //        return BadRequest("Email already exists.");
            //    }
            //    return StatusCode(StatusCodes.Status500InternalServerError, "An error occurred during registration.");
            //}
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Author author)
        {
            var authorExist = _context.Authors.SingleOrDefault(a => a.Email == author.Email);
            if (authorExist == null) { return BadRequest("Email Not Registered"); }
            var loggingAuthor = _context.Authors.SingleOrDefault(a => a.Email == author.Email && a.Password == author.Password);

            if (loggingAuthor == null)
            {
                return BadRequest("Wrong Password");
            }

            var token = GenerateJwtToken(loggingAuthor);
            return Ok(new { Token = token, Id = loggingAuthor.Id, Name = loggingAuthor.Name });
        }

        private object GenerateJwtToken(Author author)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

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
