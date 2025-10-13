package com.Vikki.ProjectManagementSystem.DTO;

import com.Vikki.ProjectManagementSystem.Model.Project;
import com.Vikki.ProjectManagementSystem.Model.Users;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class IssueDto {
    private Long Id;

    private  String title;
    private String description;
    private String status;
    private  Long projectID;
    private  String priority;
    private LocalDate dueDate;
    private List<String> tags=new ArrayList<>();
    private UserMiniDto assignee;
    private  ProjectMiniDto project;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Long getProjectID() {
        return projectID;
    }

    public void setProjectID(Long projectID) {
        this.projectID = projectID;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public UserMiniDto getAssignee() {
        return assignee;
    }

    public void setAssignee(UserMiniDto assignee) {
        this.assignee = assignee;
    }

    public ProjectMiniDto getProject() {
        return project;
    }

    public void setProject(ProjectMiniDto project) {
        this.project = project;
    }
}
