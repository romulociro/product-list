package br.com.rc.product_api.repositories;

import br.com.rc.product_api.entities.Product;
import br.com.rc.product_api.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}