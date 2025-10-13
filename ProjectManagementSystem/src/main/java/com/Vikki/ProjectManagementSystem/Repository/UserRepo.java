package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<Users,Long> {

    public Users findByEmail(String email);

}
