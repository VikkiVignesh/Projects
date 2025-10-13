package com.Vikki.ProjectManagementSystem.Repository;

import com.Vikki.ProjectManagementSystem.Model.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepo extends JpaRepository<Messages,Long> {

    List<Messages> findByChatIdOrderByCreatedAtAsc(Long chatId);
}
