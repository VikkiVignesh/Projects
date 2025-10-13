package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.Model.PlanType;
import com.Vikki.ProjectManagementSystem.Model.Subscription;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.SubscriptionRepo;
import com.Vikki.ProjectManagementSystem.Services.SubscriptionService;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/subscription")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private UserService userService;


    @GetMapping("/user_sub")
    public ResponseEntity<Subscription> getUserSubscription(
            @RequestHeader("Authorization") String jwt
    ) throws  Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);
        Subscription subscription=subscriptionService.getUserSubscription(user.getId());

        return  ResponseEntity.ok(subscription);
    }


    @PatchMapping("/upgrade")
    public ResponseEntity<Subscription> upgradeSubscription(
            @RequestParam PlanType planType,
            @RequestHeader("Authorization") String jwt
    ) throws  Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);
        Subscription subscription=subscriptionService.upgradeSubscription(user.getId(),planType);

        return  ResponseEntity.ok(subscription);
    }



}
