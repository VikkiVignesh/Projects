package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Config.JwtProvider;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.Vikki.ProjectManagementSystem.Config.JwtProvider.generateToken;


public interface UserService {

    Users findUserProfileByJwt(String jwt) throws Exception;

    Users findUserByEmail(String email) throws Exception;

    Users findUserById(Long userId) throws Exception;

    Users updateUsersProjectSize(Users user, int number);
}
