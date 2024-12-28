package com.jrremy.portfolio_manager.portfolio.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("transactions")
public class Transaction {
    @Id
    private Long id;

    private String assetType;
    private String ticker;
    private String transactionType;
    private Double quantity;
    private Double price;
    private LocalDateTime timestamp;

    public Transaction() {}

    public Transaction(Long id, String assetType, String ticker, String transactionType, Double quantity, Double price, LocalDateTime timestamp) {
        this.id = id;
        this.assetType = assetType;
        this.ticker = ticker;
        this.transactionType = transactionType;
        this.quantity = quantity;
        this.price = price;
        this.timestamp = timestamp;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAssetType() {
       return assetType;
    }

    public void setAssetType(String assetType) {
        this.assetType = assetType;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getType() {
        return transactionType;
    }

    public void setType(String transactionType) {
        this.transactionType = transactionType;
    }

    public Double getQuantity() {
        return quantity;
    }

    public void setQuantity(Double quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
