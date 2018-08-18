using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace flagship.Controllers
{
    [Route("api/[controller]")]
    public class FleetController : Controller
    {
        [HttpGet("")]
        public async Task<IActionResult> SearchFleets()
        {
            return null;
        }
    }
}
