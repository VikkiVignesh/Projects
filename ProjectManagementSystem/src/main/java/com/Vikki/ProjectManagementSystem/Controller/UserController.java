package com.Vikki.ProjectManagementSystem.Controller;


import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController
{

    @Autowired
    private UserService userService;


    @GetMapping("/profile")
    public Users getUserProfile(
            @RequestHeader("Authorization") String Jwt
    ) throws Exception {
        return userService.findUserProfileByJwt(Jwt);
    }
}
