package com.Vikki.ProjectManagementSystem.Services;

import com.Vikki.ProjectManagementSystem.DTO.IssueDto;
import com.Vikki.ProjectManagementSystem.Model.Issues;
import com.Vikki.ProjectManagementSystem.Model.Users;
import com.Vikki.ProjectManagementSystem.Requests.IssueRequest;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public interface IssuesService {

    Issues getIssueById(Long issueId) throws Exception;

    List<IssueDto> getIssueByProjectId(Long pId) throws Exception;

    Issues createIssue(IssueRequest issue, Users user) throws Exception;

    void deleteIssue(Long issueId,Long userId) throws Exception;

    List<Issues> serachIssues(String title,String status,String priority,Long assigneeId);

    List<Users> getAssigneeForIssue(Long issueId) throws Exception;

    Issues addUserToIssue(Long issueId,Long userId) throws Exception;

    Issues updateStatus(Long IssueId,String status) throws Exception;


}
