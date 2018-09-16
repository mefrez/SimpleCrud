using Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;

namespace Repositories
{
    public interface ICustomerRepository
    {
        List<Customer> Get();

        Customer Post(Customer customer);

        void Delete(int id);

        Customer Update(Customer customer);

    }
    public class CustomerRepository : ICustomerRepository
    {

        protected DataContext Db { get; set; }

        public CustomerRepository(DataContext db)
        {
            Db = db;
        }

        private DbSet<Customer> DbSet
        {
            get
            {
                return Db.Customers;
            }

        }

        public List<Customer> Get()
        {
            try
            {
               return DbSet.ToList();              
            }
            catch(Exception ex)
            {
                throw;
            }
        }

        public Customer Post(Customer customer)
        {
            try
            {
                DbSet.Add(customer);
                Db.SaveChanges();

                return customer;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public void Delete(int id)
        {
            try
            {
                DbSet.Remove(DbSet.FirstOrDefault(x => x.Id == id));
                Db.SaveChanges();

            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public Customer Update(Customer customer)
        {
            try
            {
                DbSet.Update(customer);
                Db.SaveChanges();

                return customer;

            }
            catch (Exception ex)
            {
                throw;
            }
        }
    }
}
