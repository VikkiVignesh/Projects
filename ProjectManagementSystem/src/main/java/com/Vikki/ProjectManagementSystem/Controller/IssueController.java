package com.Vikki.ProjectManagementSystem.Controller;

import com.Vikki.ProjectManagementSystem.DTO.IssueDto;
import com.Vikki.ProjectManagementSystem.DTO.ProjectMiniDto;
import com.Vikki.ProjectManagementSystem.DTO.UserMiniDto;
import com.Vikki.ProjectManagementSystem.Model.Issues;
import com.Vikki.ProjectManagementSystem.Model.Project;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Requests.IssueRequest;
import com.Vikki.ProjectManagementSystem.Response.APIResponses;
import com.Vikki.ProjectManagementSystem.Services.IssuesService;
import com.Vikki.ProjectManagementSystem.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import  java.util.List;
@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssuesService issuesService;

    @Autowired
    private UserService userService;



    @GetMapping("/{issueId}")
    public ResponseEntity<Issues> getIssueById(@PathVariable Long issueId) throws Exception
    {
        return ResponseEntity.ok(issuesService.getIssueById(issueId));
    }


    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<IssueDto>> getIssuesByProjectId(@PathVariable Long projectId) throws  Exception
    {
        return  ResponseEntity.ok(issuesService.getIssueByProjectId(projectId));
    }

    @PostMapping("/create")
    public ResponseEntity<IssueDto> createIssue(
            @RequestBody IssueRequest issue,
            @RequestHeader("Authorization")String jwt) throws  Exception
    {
        System.out.println("Issue -------- "+issue);
        Users tokenUser=userService.findUserProfileByJwt(jwt);
        Users user=userService.findUserById(tokenUser.getId());

        Issues createdIssue=issuesService.createIssue(issue,tokenUser);

        IssueDto issueDTO=new IssueDto();

        issueDTO.setDescription(createdIssue.getDescription());
        issueDTO.setDueDate(createdIssue.getDueDate());
        issueDTO.setId(createdIssue.getId());
        issueDTO.setPriority(createdIssue.getPriority());
        issueDTO.setProjectID(createdIssue.getProjectID());
        issueDTO.setTags(createdIssue.getTags());
        issueDTO.setTitle(createdIssue.getTitle());
        issueDTO.setStatus(createdIssue.getStatus());

        //issueDTO.setProject(createdIssue.getProject());
        Project p = createdIssue.getProject();
        if (p != null) {
            issueDTO.setProject(new ProjectMiniDto(
                    p.getId(),
                    p.getName(),
                    p.getDescription()
            ));
        }

        if (createdIssue.getAssignee() != null) {
            Users assignee = createdIssue.getAssignee();
            issueDTO.setAssignee(new UserMiniDto(
                    assignee.getId(),
                    assignee.getName(),
                    assignee.getEmail(),
                    assignee.getProjectsize(),
                    assignee.getAllIssues()
            ));
        }
        //issueDTO.setAssignee(createdIssue.getAssignee());

        return ResponseEntity.ok(issueDTO);
    }


    @PutMapping("/{issueId}")
    public  ResponseEntity<IssueRequest> updateIssue(
            @PathVariable Long issueId,
            @RequestBody IssueRequest updatedIssue,
            @RequestHeader("Authorization") String jwt
    ) throws Exception
    {
        return  ResponseEntity.ok(updatedIssue);
    }


    @DeleteMapping("/del/{issueId}")
    public ResponseEntity<APIResponses> deleteIssue(
            @PathVariable Long issueId,
            @RequestHeader("Authorization") String jwt
    ) throws Exception
    {
        Users user=userService.findUserProfileByJwt(jwt);

        issuesService.deleteIssue(issueId,user.getId());
        return  ResponseEntity.ok(new APIResponses("Issue with ID :- "+issueId+" deleted successfully.. "));
    }


    @PutMapping("/{issueId}/assignee/{userId}")
    public ResponseEntity<IssueDto> addUserToIssue(
            @PathVariable Long issueId,
            @PathVariable Long userId
    ) throws  Exception
    {
        Issues issue=issuesService.addUserToIssue(issueId,userId);

        IssueDto dto = new IssueDto();
        dto.setId(issue.getId());
        dto.setTitle(issue.getTitle());
        dto.setDescription(issue.getDescription());
        dto.setStatus(issue.getStatus());
        dto.setProjectID(issue.getProjectID());
        dto.setPriority(issue.getPriority());
        dto.setDueDate(issue.getDueDate());
        dto.setTags(issue.getTags());

        if (issue.getAssignee() != null) {
            Users assignee = issue.getAssignee();
            dto.setAssignee(new UserMiniDto(
                    assignee.getId(),
                    assignee.getName(),
                    assignee.getEmail(),
                    assignee.getProjectsize(),
                    assignee.getAllIssues()
            ));
        }

        if (issue.getProject() != null) {
            Project p = issue.getProject();
            dto.setProject(new ProjectMiniDto(p.getId(), p.getName(), p.getDescription()));
        }

        return  ResponseEntity.ok(dto);
    }


    @PutMapping("/{issueId}/status/{status}")
    public  ResponseEntity<Issues> updateIssuesStatus(
            @PathVariable Long issueId,
            @PathVariable String status
    ) throws  Exception
    {
        Issues issue=issuesService.updateStatus(issueId,status);
        return ResponseEntity.ok(issue);
    }


}
