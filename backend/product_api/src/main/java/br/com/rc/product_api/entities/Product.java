package br.com.rc.product_api.entities;

import br.com.rc.product_api.dto.ProductDTO;
import jakarta.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(name = "product")
public class Product implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String supplier;
    private Double price;

    public Product() {
    }

    public Product(Long id, String name, String supplier, Double price, String imgUrl, Instant date) {
        this.id = id;
        this.name = name;
        this.supplier = supplier;
        this.price = price;
    }

    public Product(ProductDTO dto) {
        this.id = dto.getId();
        this.name = dto.getName();
        this.supplier = dto.getSupplier();
        this.price = dto.getPrice();
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Product product = (Product) o;

        return Objects.equals(id, product.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
