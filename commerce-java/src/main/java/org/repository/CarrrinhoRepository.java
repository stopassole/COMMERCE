package org.repository;

import javax.enterprise.context.ApplicationScoped;

import org.entity.Carrinho;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

@ApplicationScoped
public class CarrrinhoRepository implements PanacheRepositoryBase<Carrinho, Integer>{
}
