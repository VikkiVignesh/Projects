package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.Invitation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvitationRepo extends JpaRepository<Invitation, Long> {
    Invitation findByToken(String token);

    Invitation findByEmail(String email);
}
