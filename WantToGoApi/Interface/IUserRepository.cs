using WantToGoApi.Models;

namespace WantToGoApi.Interface
{
    public interface IUserRepository
    {
        List<User> GetAllUsers();
        User GetUserById(int id);
        User GetUserByFirebaseId(string firebaseUserId);
        int AddUser(User user);
        int UpdateUser(int id, User user);
    }
}
