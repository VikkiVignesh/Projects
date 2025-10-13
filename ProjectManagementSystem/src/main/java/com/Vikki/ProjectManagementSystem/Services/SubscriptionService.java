package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.PlanType;
import com.Vikki.ProjectManagementSystem.Model.Subscription;
import com.Vikki.ProjectManagementSystem.Model.Users;
import org.springframework.stereotype.Service;

@Service
public interface SubscriptionService {


    Subscription createSubscription(Users user);

    Subscription getUserSubscription(Long userId) throws  Exception;

    Subscription upgradeSubscription(Long userId, PlanType planType);

    boolean isValid(Subscription subscription);
}
