package org.repository;

import javax.enterprise.context.ApplicationScoped;

import org.entity.Produto;

import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

@ApplicationScoped
public class ProdutoRepository implements PanacheRepositoryBase<Produto, Integer> {
}
