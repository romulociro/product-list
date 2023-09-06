package br.com.rc.product_api.services;

import br.com.rc.product_api.dto.UserCreateDTO;
import br.com.rc.product_api.dto.UserDTO;
import br.com.rc.product_api.entities.User;
import br.com.rc.product_api.exceptions.ResourceNotFoundException;
import br.com.rc.product_api.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;

    @Transactional()
    public List<UserDTO> findAll() {
        List<User> list = repository.findAll();

        return list.stream().map(p -> new UserDTO(p)).collect(Collectors.toList());
    }

    @Transactional
    public UserDTO create(UserCreateDTO dto) {
        User entity = new User();
        copyDtoToEntity(dto, entity);
        entity.setPassword(passwordEncoder.encode(dto.getPassword()));
        entity = repository.save(entity);
        return new UserDTO(entity);
    }

    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
        User entity = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
        copyDtoToEntity(dto, entity);
        entity = repository.save(entity);
        return new UserDTO(entity);
    }

    public void delete(Long id) {
        try {
            repository.deleteById(id);
        }
        catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException("Id not found "+id);
        }
    }

    private void copyDtoToEntity(UserDTO dto, User entity) {
        entity.setUsername(dto.getUsername());
    }
}
