package com.jrremy.portfolio_manager.portfolio.repository;

import com.jrremy.portfolio_manager.portfolio.model.Transaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TransactionRepository extends CrudRepository<Transaction, Long> {
}
