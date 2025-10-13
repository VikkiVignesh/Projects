package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Config.JwtProvider;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements  UserService{

    @Autowired
    private UserRepo userRepo;

    @Override
    public Users findUserProfileByJwt(String jwt) throws Exception {
        String email= JwtProvider.getEmailFrmTkn(jwt);

        return findUserByEmail(email);
    }

    @Override
    public Users findUserByEmail(String email) throws Exception {

        Users usr=userRepo.findByEmail(email);
        if(usr==null)
        {
            throw  new Exception("user Not Found");
        }
        return usr;
    }

    @Override
    public Users findUserById(Long userId) throws Exception {
        Optional<Users> usr=userRepo.findById(userId);
        if(usr.isEmpty())
        {
            throw  new Exception("User Not Found..");
        }
        return usr.get();
    }

    @Override
    public Users updateUsersProjectSize(Users user, int number) {
        user.setProjectsize(user.getProjectsize()+number);

        return userRepo.save(user);
    }
}
