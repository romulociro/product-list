package br.com.rc.product_api.dto;

import br.com.rc.product_api.entities.Product;

import java.io.Serializable;
import java.time.Instant;

public class ProductDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String name;
    private String supplier;
    private Double price;

    public ProductDTO() {
    }

    public ProductDTO(Long id, String name, String supplier, Double price, String imgUrl, Instant date) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
        this.price = price;
    }

    public ProductDTO(Product entity) {
        this.id = entity.getId();
        this.name = entity.getName();
        this.supplier = entity.getSupplier();
        this.price = entity.getPrice();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSupplier() {
        return supplier;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
