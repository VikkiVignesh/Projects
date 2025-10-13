package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.PlanType;
import com.Vikki.ProjectManagementSystem.Model.Subscription;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.SubscriptionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class SubscriptionServiceImpl implements SubscriptionService{

    @Autowired
    private  UserService userService;

    @Autowired
    private SubscriptionRepo subscriptionRepo;


    @Override
    public Subscription createSubscription(Users user) {
        Subscription subscription=new Subscription();

        subscription.setUser(user);
        subscription.setSubscriptionStartDate(LocalDate.now());
        subscription.setGetSubscriptionEndDate(LocalDate.now().plusMonths(12));
        subscription.setValid(true);
        subscription.setPlanType(PlanType.FREE);

        return subscriptionRepo.save(subscription);
    }

    @Override
    public Subscription getUserSubscription(Long userId) throws Exception {
        Subscription subscription=subscriptionRepo.findByUserId(userId);

        if(!isValid(subscription))
        {
            subscription.setPlanType(PlanType.FREE);
            subscription.setGetSubscriptionEndDate(LocalDate.now().plusMonths(12));
            subscription.setSubscriptionStartDate(LocalDate.now() );
        }
        return subscriptionRepo.save(subscription);
    }

    @Override
    public Subscription upgradeSubscription(Long userId, PlanType planType) {
        Subscription subscription=subscriptionRepo.findByUserId(userId);
        subscription.setPlanType(planType);
        subscription.setSubscriptionStartDate(LocalDate.now());
        if(planType.equals(PlanType.ANNUALLY))
        {
            subscription.setGetSubscriptionEndDate(LocalDate.now().plusMonths(12));
        }
        else{
            subscription.setGetSubscriptionEndDate(LocalDate.now().plusMonths(1));
        }
        return subscription;
    }

    @Override
    public boolean isValid(Subscription subscription) {
        if(subscription.getPlanType().equals(PlanType.FREE))
        {
            return  true;
        }

        LocalDate endDate=subscription.getGetSubscriptionEndDate();
        LocalDate currDate=LocalDate.now();

        return endDate.isAfter(currDate) || endDate.isEqual(currDate);
    }
}
