package br.com.rc.product_api.dto;

public class UserCreateDTO extends UserDTO{
    private static final long serialVersionUID = 1L;

    private String password;

    UserCreateDTO(){
        super();
    }

    public String getPassword(){
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
