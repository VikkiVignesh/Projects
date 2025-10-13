package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.Model.*;
import com.Vikki.ProjectManagementSystem.Requests.InviteRequest;
import com.Vikki.ProjectManagementSystem.Response.APIResponses;
import com.Vikki.ProjectManagementSystem.Services.InvitationService;
import com.Vikki.ProjectManagementSystem.Services.ProjectService;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Autowired
    private InvitationService invitationService;


    @GetMapping("/all")
    public ResponseEntity<List<Project>> getProjects(
            @RequestBody(required = false) String category,
            @RequestBody(required=false) String tag,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        Users user=userService.findUserProfileByJwt(jwt);
        List<Project> projects=projectService.getProjectsByTeam(user,category,tag);

        return  new ResponseEntity<>(projects, HttpStatus.OK);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<Project> getProjectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {

        Project projects=projectService.getProjectById(projectId);

        return  new ResponseEntity<>(projects, HttpStatus.OK);
    }



    @PostMapping("/create")
    public ResponseEntity<Project> createProject(
            @RequestBody Project project,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        Project createdProject=projectService.createProject(project,user);

        return  new ResponseEntity<>(createdProject, HttpStatus.OK);
    }

    @GetMapping("/user/{userId}")
    public  ResponseEntity<List<Project>> getProjectByUserId(
            @PathVariable Long userId,
            @RequestHeader("Authorization") String Jwt
    ) throws Exception
    {
        Users user=userService.findUserProfileByJwt(Jwt);
        List<Project> projects = projectService.getProjectsByUserId(userId);
        return  ResponseEntity.ok(projects);
    }

    @PatchMapping ("/update/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long projectId,
            @RequestBody Project project,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        Project updateProject=projectService.updateProject(project,projectId);

        return  new ResponseEntity<>(updateProject, HttpStatus.OK);
    }


    @DeleteMapping("/delete/{projectId}")
    public ResponseEntity<APIResponses> deleteProject(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        projectService.deleteProject(projectId,user.getId());

        return  new ResponseEntity<>(new APIResponses("Project "+projectId+"deleted..."), HttpStatus.OK);
    }


    @GetMapping("/search")
    public ResponseEntity<List<Project>> SearchProject(
            @RequestParam(required = false) String keyword,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        List<Project> projects=projectService.serachProjects(keyword,user);

        return  new ResponseEntity<>(projects, HttpStatus.OK);
    }


    @GetMapping("/chat/{projectId}")
    public ResponseEntity<Chat> getChatByProjectById(
            @PathVariable Long projectId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        Chat projectChat=projectService.getChatByProjectId(projectId);
        return  new ResponseEntity<>(projectChat, HttpStatus.OK);
    }


    @PostMapping("/invite")
    public ResponseEntity<APIResponses> inviteProject(
            @RequestBody InviteRequest inviteRequest,
            @RequestHeader("Authorization") String jwt
    ) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        invitationService.sendInvitation(inviteRequest.getEmail(),inviteRequest.getpId());

        return  new ResponseEntity<>(new APIResponses("User Invitation sent."), HttpStatus.OK);
    }


    @GetMapping("/accept_invitation")
    public ResponseEntity<Invitation> acceptInviteProject(
            @RequestParam String token,
            @RequestBody Project project
            ,@RequestHeader("Authorization") String jwt) throws Exception {
        Users user=userService.findUserProfileByJwt(jwt);
        Invitation invitation=invitationService.acceptInvitation(token,user.getId());
        projectService.addUserToProject(invitation.getProjectId(), user.getId());
        return  new ResponseEntity<>(invitation, HttpStatus.OK);
    }

}
