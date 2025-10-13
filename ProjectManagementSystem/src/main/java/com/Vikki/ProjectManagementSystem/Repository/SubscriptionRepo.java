package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.PlanType;
import com.Vikki.ProjectManagementSystem.Model.Subscription;
import com.Vikki.ProjectManagementSystem.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionRepo extends JpaRepository<Subscription,Long> {

    Subscription findByUserId(Long userId);
}
