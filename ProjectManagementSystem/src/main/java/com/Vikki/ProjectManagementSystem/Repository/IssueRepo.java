package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.Issues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IssueRepo extends JpaRepository<Issues,Long> {

    List<Issues> findByProjectId(Long id);

}
