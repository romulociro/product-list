package br.com.rc.product_api.services;

import br.com.rc.product_api.dto.ProductDTO;
import br.com.rc.product_api.entities.Product;
import br.com.rc.product_api.repositories.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> findAll() {
        return repository.findAll();
    }

}
