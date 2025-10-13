package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.DTO.IssueDto;
import com.Vikki.ProjectManagementSystem.DTO.ProjectMiniDto;
import com.Vikki.ProjectManagementSystem.DTO.UserMiniDto;
import com.Vikki.ProjectManagementSystem.Model.Issues;
import com.Vikki.ProjectManagementSystem.Model.Project;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Repository.IssueRepo;
import com.Vikki.ProjectManagementSystem.Requests.IssueRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IssueServiceImpl implements IssuesService{

    @Autowired
    private IssueRepo issueRepo;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private UserService userService;

    @Override
    public Issues getIssueById(Long issueId) throws Exception {
        Optional<Issues> issue=issueRepo.findById(issueId);
        if(issue.isEmpty())
        {
            throw new Exception("No Issues found with issueId"+issueId);
        }
        return issue.get();
    }

    @Override
    public List<IssueDto> getIssueByProjectId(Long pId) throws Exception {
        List<Issues> issues = issueRepo.findByProjectId(pId);

        List<IssueDto> issueDtoList = new ArrayList<>();

        for (Issues issue : issues) {
            IssueDto dto = new IssueDto();
            dto.setId(issue.getId());
            dto.setTitle(issue.getTitle());
            dto.setDescription(issue.getDescription());
            dto.setStatus(issue.getStatus());
            dto.setProjectID(issue.getProjectID());
            dto.setPriority(issue.getPriority());
            dto.setDueDate(issue.getDueDate());
            dto.setTags(issue.getTags());

            // Map Project to ProjectMiniDto
            if (issue.getProject() != null) {
                dto.setProject(new ProjectMiniDto(
                        issue.getProject().getId(),
                        issue.getProject().getName(),
                        issue.getProject().getDescription()
                ));
            }

            // Map Assignee to UserMiniDto
            if (issue.getAssignee() != null) {
                dto.setAssignee(new UserMiniDto(
                        issue.getAssignee().getId(),
                        issue.getAssignee().getName(),
                        issue.getAssignee().getEmail(),
                        issue.getAssignee().getProjectsize(),
                        issue.getAssignee().getAllIssues()
                ));
            }

            issueDtoList.add(dto);
        }
        return issueDtoList;
    }

    @Override
    public Issues createIssue(IssueRequest issueReq, Users user) throws Exception {
        Project project=projectService.getProjectById(issueReq.getProjectID());

        Issues issue=new Issues();
        issue.setTitle(issueReq.getTitle());
        issue.setDescription(issueReq.getDescription());
        issue.setStatus(issueReq.getStatus());
        issue.setProjectID(issueReq.getProjectID());
        issue.setPriority(issueReq.getPriority());
        issue.setDueDate(issueReq.getDueDate());
        issue.setProject(project);

        return issueRepo.save(issue);
    }

    @Override
    public void deleteIssue(Long issueId, Long userId) throws Exception {
        getIssueById(issueId);
        issueRepo.deleteById(issueId);
    }

    @Override
    public List<Issues> serachIssues(String title, String status, String priority, Long assigneeId) {
        return null;
    }

    @Override
    public List<Users> getAssigneeForIssue(Long issueId) throws Exception {
        return null;
    }

    @Override
    public Issues addUserToIssue(Long issueId, Long userId) throws Exception {
        Users user=userService.findUserById(userId);
        Issues issues=getIssueById(issueId);

        issues.setAssignee(user);
        return issueRepo.save(issues);
    }

    @Override
    public Issues updateStatus(Long IssueId, String status) throws Exception {
        Issues issues=getIssueById(IssueId);

        issues.setStatus(status);
        return issueRepo.save(issues);
    }
}
