package br.com.rc.product_api.services;

import br.com.rc.product_api.dto.ProductDTO;
import br.com.rc.product_api.entities.Product;
import br.com.rc.product_api.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    @Transactional()
    public List<ProductDTO> findAll() {
        List<Product> list = repository.findAll();

        return list.stream().map(p -> new ProductDTO(p)).collect(Collectors.toList());
    }

    @Transactional
    public ProductDTO create(ProductDTO dto) {
        Product entity = new Product(dto);
        entity = repository.save(entity);
        return new ProductDTO(entity);
    }
}
