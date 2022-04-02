using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;
using Application.Core;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult> GetActivities([FromQuery]ActivityParams param)
        {
            return HandlePageResults(await Mediator.Send(new List.Query{Params = param}));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetActivity(Guid id)
        {
            return HandleResults(await Mediator.Send(new Details.Query{Id = id}));
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            return HandleResults(await Mediator.Send(new Create.Command {Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResults(await Mediator.Send(new Edit.Command{Activity = activity}));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResults(await Mediator.Send(new Delete.Command{Id = id}));
        }

        [HttpPost("{id}/attend")]
        public async Task<IActionResult> Attend(Guid id)
        {
            return HandleResults(await Mediator.Send(new UpdateAttendance.Command{Id = id}));
        }
    }
}