package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.Model.Chat;
import com.Vikki.ProjectManagementSystem.Model.Project;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.ProjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService{

    @Autowired
    private ProjectRepo projectRepo;

    @Autowired
    private UserService userService;

    @Autowired
    private ChatService chatService;

    @Override
    public Project createProject(Project project, Users user) throws Exception {
        Project createdProject=new Project();

        createdProject.setOwner(user);
        createdProject.setTags(project.getTags());
        createdProject.setName(project.getName());
        createdProject.setCategory(project.getCategory());
        createdProject.setDescription(project.getDescription());
        createdProject.getTeam().add(user);

        Project savedProject=projectRepo.save(createdProject);

        Chat cht=new Chat();
        cht.setProject(savedProject);

        Chat projectChat=chatService.createChat(cht);

        savedProject.setChat(projectChat);
        return savedProject;
    }

    @Override
    public List<Project> getProjectsByTeam(Users user, String category, String tag) throws Exception {
        List<Project> projects=projectRepo.findByTeamContainingOrOwner(user,user);

        if(category!=null)
        {
            projects=projects.stream().filter(proj->proj.getCategory().equals(category))
                    .collect(Collectors.toList());
        }

        if(tag!=null)
        {
            projects=projects.stream().filter(proj->proj.getTags().contains(tag))
                    .collect(Collectors.toList());
        }
        return projects;
    }

    @Override
    public Project getProjectById(Long pId) throws Exception {
        Optional<Project> project=projectRepo.findById(pId);
        if(project.isEmpty())
        {
            throw  new Exception("Project not found..");
        }
        return project.get();
    }

    @Override
    public void deleteProject(Long pId, Long uId) throws Exception {

        Project project= getProjectById(pId);
        if(project==null)
        {
            throw  new Exception("project not found can't delete");
        }
        projectRepo.deleteById(pId);
    }

    @Override
    public Project updateProject(Project updProject, Long pId) throws Exception {
        Project project=getProjectById(pId);
        project.setName(updProject.getName());
        project.setDescription(updProject.getDescription());
        project.setTags(updProject.getTags());

        projectRepo.save(project);
        return project;
    }

    @Override
    public void addUserToProject(Long projectId, Long userId) throws Exception {
        Project project=getProjectById(projectId);
        Users user=userService.findUserById(userId);

        if(!project.getTeam().contains(user))
        {
            project.getChat().getUsers().add(user);
            project.getTeam().add(user);
        }
        projectRepo.save(project);
    }

    @Override
    public void removeUserFromProject(Long projectId, Long userId) throws Exception {

        Project project=getProjectById(projectId);
        Users user=userService.findUserById(userId);

        if(project.getTeam().contains(user))
        {
            project.getChat().getUsers().remove(user);
            project.getTeam().remove(user);
        }
        projectRepo.save(project);
    }

    @Override
    public Chat getChatByProjectId(Long ProjectId) throws Exception {
        Project project=getProjectById(ProjectId);
        return project.getChat();
    }

    @Override
    public List<Project> serachProjects(String keyword, Users user) throws Exception {
        String partialName="%"+keyword+"%";
        List<Project> projects=projectRepo.findByNameContainingIgnoreCaseAndTeamContains(keyword,user);
        return projects;
    }

    @Override
    public List<Project> getProjectsByUserId(Long userId) throws Exception {
        Users user = userService.findUserById(userId);
        List<Project> projects = projectRepo.findByOwner(user);
        return projects;
    }


}
