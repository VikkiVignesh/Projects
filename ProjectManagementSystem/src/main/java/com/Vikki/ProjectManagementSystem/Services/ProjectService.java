package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Chat;
import com.Vikki.ProjectManagementSystem.Model.Project;
import com.Vikki.ProjectManagementSystem.Model.Users;

import java.util.List;

public interface ProjectService {
    Project createProject(Project project,Users user) throws Exception;

    List<Project> getProjectsByTeam(Users user, String category, String tag) throws  Exception;

    Project getProjectById(Long pId) throws  Exception;

    void deleteProject(Long pId, Long uId) throws Exception;

    Project updateProject(Project updProject,Long pId) throws  Exception;

    void addUserToProject(Long projectId, Long userId) throws Exception;

    void removeUserFromProject(Long projectId, Long userId) throws Exception;

    Chat getChatByProjectId(Long ProjectId) throws Exception;

    List<Project> serachProjects(String keyword, Users user) throws Exception;

    List<Project> getProjectsByUserId(Long userId) throws  Exception;
}
