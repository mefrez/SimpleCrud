using AutoMapper;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : Controller
    {

        private readonly ICustomerRepository _customerRepository;
        private readonly IMapper _mapper;
        public CustomerController(ICustomerRepository customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }
        // GET api/customer
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                List<Customer> list = _customerRepository.Get();

                List<CustomerViewModel> viewModelList = _mapper.Map<List<Customer>, List<CustomerViewModel>>(list);

                return Ok(viewModelList);
                
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // POST api/customer
        [HttpPost]
        public ActionResult Post([FromBody] CustomerViewModel vm)
        {
            try
            {
                Customer customer = _mapper.Map<CustomerViewModel, Customer>(vm);

                Customer c = _customerRepository.Post(customer);

                vm = _mapper.Map<Customer, CustomerViewModel>(c);

                return Ok(vm);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // PUT api/customer
        [HttpPut()]
        public ActionResult Put([FromBody] CustomerViewModel vm)
        {
            try
            {
                Customer customer = _mapper.Map<CustomerViewModel, Customer>(vm);

                Customer c = _customerRepository.Update(customer);

                vm = _mapper.Map<Customer, CustomerViewModel>(c);

                return Ok(vm);

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        // DELETE api/customer/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _customerRepository.Delete(id);

                return Ok();

            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
