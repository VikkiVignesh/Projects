package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.Project;
import com.Vikki.ProjectManagementSystem.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectRepo extends JpaRepository<Project,Long> {

    List<Project> findByOwner(Users user);

    @Query("SELECT p from Project p join p.team t where t=:user")
    List<Project> findProjectByTeam(@Param("user") Users user);

    List<Project> findByNameContainingIgnoreCaseAndTeamContains(String partialNAme,Users user);

    List<Project> findByTeamContainingOrOwner(Users user,Users owner);
}
