package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRepo extends JpaRepository<Chat,Long> {
}
