package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.Config.JwtProvider;
import com.Vikki.ProjectManagementSystem.Requests.LoginUser;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.UserRepo;
import com.Vikki.ProjectManagementSystem.Response.AuthResponse;
import com.Vikki.ProjectManagementSystem.Services.CustomeUserDetailsImp;
import com.Vikki.ProjectManagementSystem.Services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {


    @Autowired
    private UserRepo userRepo;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomeUserDetailsImp customeUserDetails;

    @Autowired
    private SubscriptionService subscriptionService;

    @PostMapping("/sign-up")
    public ResponseEntity<AuthResponse> registerUser(@RequestBody Users user)
    {
        Users isuserExists=userRepo.findByEmail(user.getEmail());
        AuthResponse res=new AuthResponse();

        if(isuserExists!=null)
        {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new AuthResponse(null, "Email already exists with another account."));
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);

        subscriptionService.createSubscription(user);

        Authentication authentication=new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword());
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwtTkn=JwtProvider.generateToken(authentication);

        res.setMsg("SingUp Success");
        res.setJwt(jwtTkn);

        return  new ResponseEntity<>(res,HttpStatus.OK);
    }


    @PostMapping("/sign-in")
    public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginUser lguser)
    {
        try {
            Authentication authentication = authenticateUser(lguser.getEmail(), lguser.getPassword());
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtTkn = JwtProvider.generateToken(authentication);

            return ResponseEntity.ok(new AuthResponse(jwtTkn, "Sign In Successful"));
        }
        catch (UsernameNotFoundException e) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new AuthResponse(null, "User not registered"));
        }
        catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, "Invalid password"));
        }
        catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new AuthResponse(null, "An unexpected error occurred"));
        }
    }

    private Authentication authenticateUser(String email, String password) {
        UserDetails userDetails=customeUserDetails.loadUserByUsername(email);

        if(userDetails == null)
        {
            throw new UsernameNotFoundException("User Not Registred..");
        }
        if(!passwordEncoder.matches(password,userDetails.getPassword()))
        {
            throw  new BadCredentialsException("Passowrd not Matched...");
        }
        return  new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
    }
}
