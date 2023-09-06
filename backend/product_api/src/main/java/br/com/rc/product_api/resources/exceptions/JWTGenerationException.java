package br.com.rc.product_api.resources.exceptions;

public class JWTGenerationException extends RuntimeException {
    public JWTGenerationException(String message, Throwable cause) {
        super(message, cause);
    }
}
